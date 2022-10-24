import { Box, Typography, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Stack, useTheme } from '@mui/system';
import RedeemStepper from '../../../components/redeem/RedeemStepper';
import CharitySelectionStep from '../../../components/redeem/steps/CharitySelectionStep';
import useSWR from 'swr';
import { Nullable } from '../../../types/utils';
import { CouponRedeemData, CouponRedeemFormData, CouponRedeemPostData } from '../../../types/coupons';
import { useRouter } from 'next/router';
import api from '../../../frontendApis';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  containerSx,
  desktopFormContainerSx,
  desktopHelpButtonSx,
  mobileFormContainerSx,
  mobileHelpButtonSx,
} from '../../../styles/components/redeem/RedeemStyles';
import PersonalContributionStep from '../../../components/redeem/steps/PersonalContributionStep';
import VerifyStep from '../../../components/redeem/steps/VerifyStep';
import AlreadyRedeemedDisplay from '../../../components/redeem/AlreadyRedeemedDisplay';
import RedeemLoading from '../../../components/redeem/RedeemLoading';
import { messageContainerSx } from '../../../styles/campaigns/indexStyles';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InstructionsDialog from '../../../components/redeem/instructions/InstructionsDialog';
import { CouponSponsorship } from '../../../types/primaryDonor';

const validationSchema = Yup.object().shape({
  campaignCharityId: Yup.number().required('Campaign charity is required'),
  amount: Yup.number()
    .nullable()
    .typeError('Amount must be a number')
    .integer('Only dollar amounts are accepted')
    .min(10, 'The minimum donation is $10')
    .max(100000, 'The maximum donation is $100000'),
});

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && typeof router.query.urlToken === 'string' ? router.query.urlToken : null;
  const { data: coupon, error } = useSWR<Nullable<CouponRedeemData>>([urlToken], (urlToken) =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );
  const isLoading = !coupon && !error;
  const hasLoadedSuccessfully = !error && coupon;
  const isCouponNotRedeemed = hasLoadedSuccessfully && !coupon.campaignCharity;

  const minStep = 0;
  const maxStep = 2;
  const [activeStep, setActiveStep] = useState<number>(minStep);
  const [redeemFormValues] = useState<CouponRedeemFormData>({ amount: 10 });
  const [openInstructions, setOpenInstructions] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (values: CouponRedeemFormData) => {
    if (urlToken === null) {
      // This should never be available as useSWR will set error / loading and form will not be visible. (Defensive)
      return Promise.reject('urlToken is invalid.');
    }

    validationSchema
      .validate(values)
      .then((values) => {
        const couponRedeemPostData: CouponRedeemPostData = {
          urlToken: urlToken,
          campaignCharityId: values.campaignCharityId,
          amount: values.amount ?? 0,
        };

        return api.coupons.redeemCoupon(couponRedeemPostData);
      })
      .then(() => router.push({ pathname: '/redeem/thank-you', query: { campaignId: coupon?.campaign.id } }));
  };

  const renderFormPage = (activeStep: number, values: CouponRedeemFormData) => {
    if (!coupon) {
      return null;
    }

    const campaignCharity = coupon.charities.find((charity) => charity.id === values.campaignCharityId);
    const couponSponsorship: CouponSponsorship = {
      primaryDonor: coupon.campaign.primaryDonor,
      couponDenomination: coupon.campaign.couponDenomination,
    };

    switch (activeStep) {
      case 0:
        return (
          <CharitySelectionStep
            couponSponsorship={couponSponsorship}
            campaignCharities={coupon.charities}
            name="campaignCharityId"
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
      case 1:
        if (!campaignCharity) {
          setActiveStep(0);
          return null;
        }

        return (
          <PersonalContributionStep
            couponSponsorship={couponSponsorship}
            campaignCharity={campaignCharity}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
      case 2:
        if (!campaignCharity) {
          setActiveStep(0);
          return null;
        }

        return (
          <VerifyStep
            charity={campaignCharity.charity}
            couponSponsorship={couponSponsorship}
            secondaryDonorAmount={values?.amount ?? 0}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container component="main" maxWidth="md">
        {isCouponNotRedeemed && (
          <IconButtonWithTooltip
            sx={isMobile ? mobileHelpButtonSx : desktopHelpButtonSx}
            icon={<HelpOutlineIcon />}
            tooltip="Instructions"
            onClick={() => setOpenInstructions(true)}
          />
        )}

        <Stack sx={containerSx} component="div" spacing={4}>
          {isLoading && (
            <>
              <RedeemStepper activeStep={activeStep} />

              <RedeemLoading />
            </>
          )}

          {error && (
            <Stack component="div" sx={messageContainerSx} spacing={2}>
              <Typography variant="h1">Error</Typography>

              <Typography variant="h2">That is all we know right now.</Typography>
            </Stack>
          )}

          {hasLoadedSuccessfully && coupon.campaignCharity && (
            <AlreadyRedeemedDisplay
              campaignId={coupon.campaign.id}
              campaignCharity={coupon.campaignCharity}
              couponSponsorship={{
                primaryDonor: coupon.campaign.primaryDonor,
                couponDenomination: coupon.denomination,
              }}
              secondaryDonorAmount={coupon.secondaryDonation?.amount ?? 0}
            />
          )}

          {isCouponNotRedeemed && (
            <>
              <RedeemStepper activeStep={activeStep} />

              <Formik initialValues={redeemFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values }) => (
                  <Form style={isMobile ? mobileFormContainerSx : desktopFormContainerSx}>
                    {renderFormPage(activeStep, values)}
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Stack>

        {isCouponNotRedeemed && (
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
