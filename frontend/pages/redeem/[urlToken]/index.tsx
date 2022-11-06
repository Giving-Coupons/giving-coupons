import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, useMediaQuery } from '@mui/material';
import { Container, Stack, useTheme } from '@mui/system';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import FormikValuesListener from '../../../components/forms/FormikValuesListener';
import ErrorDisplay from '../../../components/generic/ErrorDisplay';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import AlreadyRedeemedDisplay from '../../../components/redeem/AlreadyRedeemedDisplay';
import CampaignEndedDisplay from '../../../components/redeem/CampaignEndedDisplay';
import CampaignNotStartedDisplay from '../../../components/redeem/CampaignNotStartedDisplay';
import ExpiredDisplay from '../../../components/redeem/ExpiredDisplay';
import InstructionsDialog from '../../../components/redeem/instructions/InstructionsDialog';
import RedeemLoading from '../../../components/redeem/RedeemLoading';
import RedeemStepper from '../../../components/redeem/RedeemStepper';
import CharitySelectionStep from '../../../components/redeem/steps/CharitySelectionStep';
import PersonalContributionStep from '../../../components/redeem/steps/PersonalContributionStep';
import VerifyStep from '../../../components/redeem/steps/VerifyStep';
import api from '../../../frontendApis';
import useRedemptionState from '../../../hooks/useRedemptionState';
import {
  containerSx,
  desktopFormContainerSx,
  desktopHelpButtonSx,
  mobileFormContainerSx,
  mobileHelpButtonSx,
} from '../../../styles/components/redeem/RedeemStyles';
import { CouponRedeemData } from '../../../types/coupons';
import { CouponSponsorship } from '../../../types/primaryDonor';
import { RedemptionFormData, RedemptionPostData } from '../../../types/redemptions';
import { RedemptionState, RedemptionStep } from '../../../types/redemptionState';
import { Nullable } from '../../../types/utils';
import { log, logException } from '../../../utils/analytics';
import { DEFAULT_SECONDARY_DONATION_VALUE } from '../../../utils/constants';
import { isCouponRedeemable } from '../../../utils/coupons';

const validationSchema = Yup.object().shape({
  campaignCharityId: Yup.number().required('Campaign charity is required'),
  amount: Yup.number()
    // Ensure falsey values like 0 and empty string are set to null.
    // This is necessary for the min check and because text input can return "".
    .transform((newValue) => newValue || null)
    .nullable()
    .typeError('Amount must be a number')
    .integer('Only dollar amounts are accepted')
    .min(10, 'The minimum donation is $10')
    .max(100000, 'The maximum donation is $100000'),
});

const Redeem: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const urlToken = router.query.urlToken && typeof router.query.urlToken === 'string' ? router.query.urlToken : null;
  const [redemptionState, updateRedemptionStep] = useRedemptionState(urlToken);
  const { data: coupon, error } = useSWR<Nullable<CouponRedeemData>>([urlToken], (urlToken) =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );
  const isLoading = !coupon && !error;
  const hasLoadedSuccessfully = !error && coupon;

  const canCouponBeRedeemed = hasLoadedSuccessfully && isCouponRedeemable(coupon);

  const minStep = 0;
  const maxStep = 2;
  const [redeemFormValues, setRedeemFormValues] = useState<RedemptionFormData>({
    amount: DEFAULT_SECONDARY_DONATION_VALUE,
  });
  const [openInstructions, setOpenInstructions] = useState<boolean>(true);
  const [hasReadCookie, setHasReadCookie] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (!redemptionState || hasReadCookie) {
      return;
    }

    const { campaignCharityId, personalContribution: amount } = redemptionState;

    // Skip instructions if charityId is set.
    if (campaignCharityId) {
      setOpenInstructions(false);
    }

    setRedeemFormValues({
      campaignCharityId: campaignCharityId ?? undefined,
      amount: amount === undefined ? DEFAULT_SECONDARY_DONATION_VALUE : amount,
    });
    setHasReadCookie(true);
  }, [redemptionState]);

  const handleSubmit = (values: RedemptionFormData) => {
    if (urlToken === null) {
      // This should never be available as useSWR will set error / loading and form will not be visible. (Defensive)
      return Promise.reject('urlToken is invalid.');
    }

    validationSchema
      .validate(values)
      .catch((e) => {
        // If the user somehow entered an invalid state that prevents the validation from passing.
        enqueueSnackbar(
          'We could not redeem the coupon based on the data submitted. Please go through the flow and try again.',
          { variant: 'error' },
        );

        throw e;
      })
      .then((values) => {
        const couponRedeemPostData: RedemptionPostData = {
          urlToken: urlToken,
          campaignCharityId: values.campaignCharityId,
          amount: values.amount ?? 0,
        };

        return api.redemptions.addRedemption(couponRedeemPostData);
      })
      .then(() =>
        log('Redeem_submit', {
          campaignCharityId: values.campaignCharityId,
          couponId: coupon?.id,
          amount: values.amount,
        }),
      )
      .then(() => router.push({ pathname: '/redeem/thank-you', query: { campaignId: coupon?.campaign.id } }))
      .catch((e) => {
        logException('Unable to complete redemption on submit', false, { msg: e.toString() });
      });
  };

  const renderFormPage = (redemptionState: Nullable<RedemptionState>, values: RedemptionFormData) => {
    // Do not render if either of:
    // * The useRedemptionState has not found an existing state stored in a cookie and has not initialized a new state.
    // * Coupon has not been found by useSWR.
    if (!coupon || !redemptionState) {
      return null;
    }

    const setActiveStep = (i: number) => {
      switch (i) {
        case 0:
          return updateRedemptionStep(RedemptionStep.SELECT_CHARITY);
        case 1:
          return updateRedemptionStep(RedemptionStep.SELECT_AMOUNT);
        case 2:
          return updateRedemptionStep(RedemptionStep.VERIFY_REDEMPTION);
      }
    };

    const campaignCharity = coupon.charities.find((charity) => charity.id === values.campaignCharityId);
    const couponSponsorship: CouponSponsorship = {
      couponId: coupon.id,
      primaryDonor: coupon.campaign.primaryDonor,
      couponDenomination: coupon.campaign.couponDenomination,
    };

    switch (redemptionState.current) {
      case RedemptionStep.SELECT_CHARITY:
        return (
          <CharitySelectionStep
            couponSponsorship={couponSponsorship}
            campaignCharities={coupon.charities}
            name="campaignCharityId"
            activeStep={0}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );

      case RedemptionStep.SELECT_AMOUNT:
        if (!campaignCharity) {
          setActiveStep(0);
          return null;
        }

        return (
          <PersonalContributionStep
            couponSponsorship={couponSponsorship}
            campaignCharity={campaignCharity}
            activeStep={1}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );

      case RedemptionStep.VERIFY_REDEMPTION:
        if (!campaignCharity) {
          setActiveStep(0);
          return null;
        }

        return (
          <VerifyStep
            charity={campaignCharity.charity}
            couponSponsorship={couponSponsorship}
            secondaryDonorAmount={values?.amount ?? 0}
            activeStep={2}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
    }
  };

  const renderMainContent = (coupon: CouponRedeemData) => {
    if (coupon.redemption !== null) {
      return (
        <AlreadyRedeemedDisplay
          campaignId={coupon.campaign.id}
          campaignCharity={coupon.redemption.campaignCharity}
          couponSponsorship={{
            couponId: coupon.id,
            primaryDonor: coupon.campaign.primaryDonor,
            couponDenomination: coupon.denomination,
          }}
          secondaryDonorAmount={coupon.redemption.secondaryDonation?.amount ?? 0}
        />
      );
    }

    const { campaign } = coupon;
    const hasCampaignEnded = campaign.end.isBefore();
    if (hasCampaignEnded) {
      return <CampaignEndedDisplay campaign={campaign} isFromRedemption />;
    }

    const hasCampaignStarted = campaign.start.isBefore();
    if (!hasCampaignStarted) {
      return <CampaignNotStartedDisplay campaign={campaign} />;
    }

    const hasCouponExpired = coupon.expiresAt.isBefore();
    if (hasCouponExpired) {
      return <ExpiredDisplay coupon={coupon} />;
    }

    return (
      <>
        <RedeemStepper redemptionState={redemptionState} />

        <Formik
          initialValues={redeemFormValues}
          initialTouched={{
            campaignCharityId: redeemFormValues.campaignCharityId !== undefined,
            amount: redeemFormValues.amount !== undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, dirty }) => (
            <Form style={isMobile ? mobileFormContainerSx : desktopFormContainerSx}>
              <FormikValuesListener
                handleChange={(formikValues) => {
                  if (dirty) {
                    // If the form has been touched, replace the redemption state with the latest values on each Formik rerender
                    // (triggered by changes to Formik vars touched / values / error / etc.).
                    updateRedemptionStep(
                      redemptionState?.current ?? RedemptionStep.SELECT_CHARITY,
                      formikValues.campaignCharityId,
                      formikValues.amount,
                    );
                  } else {
                    // If form has not been touched and there is no matching redemption state in cookie, do nothing.
                  }
                }}
              />
              {renderFormPage(redemptionState, values)}
            </Form>
          )}
        </Formik>
      </>
    );
  };

  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container component="main" maxWidth="md">
        {canCouponBeRedeemed && (
          <IconButtonWithTooltip
            sx={isMobile ? mobileHelpButtonSx : desktopHelpButtonSx}
            icon={<HelpOutlineIcon />}
            tooltip="Instructions"
            onClick={() => {
              log('Redeem_openInstructions');
              setOpenInstructions(true);
            }}
          />
        )}

        <Stack sx={containerSx} component="div" spacing={4}>
          {isLoading && (
            <>
              <RedeemStepper redemptionState={redemptionState} />

              <RedeemLoading />
            </>
          )}

          {error && <ErrorDisplay statusCode={error.statusCode} entity="coupon" />}

          {hasLoadedSuccessfully && renderMainContent(coupon)}
        </Stack>

        {canCouponBeRedeemed && (
          <InstructionsDialog
            open={openInstructions}
            handleClose={() => setOpenInstructions(false)}
            primaryDonor={coupon.campaign.primaryDonor}
            couponDenomination={coupon.denomination}
            charitiesCount={coupon.charities.length}
          />
        )}
      </Container>
    </Box>
  );
};

export default Redeem;
