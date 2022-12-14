import { Box, useMediaQuery } from '@mui/material';
import { Container, Stack, useTheme } from '@mui/system';
import { Form, Formik, isInteger } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import ContributeStepper from '../../../../components/campaigns/contribute/ContributeStepper';
import ErrorDisplay from '../../../../components/generic/ErrorDisplay';
import CampaignEndedDisplay from '../../../../components/redeem/CampaignEndedDisplay';
import CampaignNotStartedDisplay from '../../../../components/redeem/CampaignNotStartedDisplay';
import RedeemLoading from '../../../../components/redeem/RedeemLoading';
import CharitySelectionStep from '../../../../components/redeem/steps/CharitySelectionStep';
import PersonalContributionStep from '../../../../components/redeem/steps/PersonalContributionStep';
import VerifyStep from '../../../../components/redeem/steps/VerifyStep';
import api from '../../../../frontendApis';
import {
  containerSx,
  desktopFormContainerSx,
  mobileFormContainerSx,
} from '../../../../styles/components/redeem/RedeemStyles';
import { CampaignPublicData } from '../../../../types/campaigns';
import { SecondaryDonationFormData, SecondaryDonationPostData } from '../../../../types/donations';
import { Nullable } from '../../../../types/utils';
import { log } from '../../../../utils/analytics';

const validationSchema = Yup.object().shape({
  campaignCharityId: Yup.number().required('Campaign charity is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .integer('Only dollar amounts are accepted')
    .min(10, 'The minimum donation is $10')
    .max(100000, 'The maximum donation is $100000'),
});

const Contribute: NextPage = () => {
  const router = useRouter();
  const campaignId =
    router.query.campaignId && isInteger(router.query.campaignId) ? Number(router.query.campaignId) : null;
  const { data: campaign, error } = useSWR<Nullable<CampaignPublicData>>([campaignId], (campaignId) =>
    campaignId !== null ? api.campaigns.getCampaign(campaignId).then((res) => res.payload) : null,
  );
  const isLoading = !campaign && !error;
  const hasLoadedSuccessfully = !error && campaign;

  const minStep = 0;
  const maxStep = 2;
  const [activeStep, setActiveStep] = useState<number>(minStep);
  const [redeemFormValues] = useState<SecondaryDonationFormData>({ amount: 10 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (values: SecondaryDonationFormData) => {
    if (campaignId === null) {
      // This should never be available as useSWR will set error / loading and form will not be visible. (Defensive)
      return Promise.reject('campaignId is invalid.');
    }

    log('Contribute_submit', {
      campaignCharityId: values.campaignCharityId,
      amount: values.amount,
    });

    validationSchema
      .validate(values)
      .then((values) => {
        const secondaryDonationPostData: SecondaryDonationPostData = {
          campaignCharityId: values.campaignCharityId,
          amount: values.amount ?? 0,
        };

        return api.secondaryDonations.addSecondaryDonation(secondaryDonationPostData);
      })
      .then(() => router.push({ pathname: `/campaigns/${campaignId}/contribute/thank-you` }));
  };

  const renderFormPage = (activeStep: number, values: SecondaryDonationFormData) => {
    if (!campaign) {
      return null;
    }

    const campaignCharity = campaign.charities.find((charity) => charity.id === values.campaignCharityId);

    switch (activeStep) {
      case 0:
        return (
          <CharitySelectionStep
            campaignCharities={campaign.charities}
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

  const renderMainContent = (campaign: CampaignPublicData) => {
    const hasCampaignStarted = campaign.start.isBefore();
    if (!hasCampaignStarted) {
      return <CampaignNotStartedDisplay campaign={campaign} />;
    }

    const hasCampaignEnded = campaign.end.isBefore();
    if (hasCampaignEnded) {
      return <CampaignEndedDisplay campaign={campaign} isFromRedemption={false} />;
    }

    return (
      <>
        <ContributeStepper activeStep={activeStep} />

        <Formik initialValues={redeemFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form style={isMobile ? mobileFormContainerSx : desktopFormContainerSx}>
              {renderFormPage(activeStep, values)}
            </Form>
          )}
        </Formik>
      </>
    );
  };

  return (
    <Box>
      <Head>
        <title>Contribute</title>
      </Head>

      <Container component="main" maxWidth="md">
        <Stack sx={containerSx} component="div" spacing={4}>
          {isLoading && (
            <>
              <ContributeStepper activeStep={activeStep} />

              <RedeemLoading />
            </>
          )}

          {error && <ErrorDisplay statusCode={error.statusCode} entity="campaign" />}

          {hasLoadedSuccessfully && renderMainContent(campaign)}
        </Stack>
      </Container>
    </Box>
  );
};

export default Contribute;
