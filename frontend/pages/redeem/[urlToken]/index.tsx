import { Box } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Stack } from '@mui/system';
import RedeemStepper from '../../../components/redeem/RedeemStepper';
import CampaignCharitySelection from '../../../components/redeem/CampaignCharitySelection';
import useSWR from 'swr';
import { Nullable } from '../../../types/utils';
import { CouponRedeemData, CouponRedeemFormData } from '../../../types/coupons';
import { useRouter } from 'next/router';
import api from '../../../frontendApis';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RedeemFormButtons from '../../../components/redeem/RedeemFormButtons';

const validationSchema = Yup.object().shape({
  campaignCharityId: Yup.number().required('Campaign charity is required'),
  amount: Yup.number().nullable().min(10, 'The minimum donation is $10').max(100000, 'The maximum donation is $100000'),
});

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && typeof router.query.urlToken === 'string' ? router.query.urlToken : null;
  const { data: coupon } = useSWR<Nullable<CouponRedeemData>>([urlToken], (urlToken) =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );

  const [redeemFormValues] = useState<CouponRedeemFormData>({});
  const minStep = 0;
  const maxStep = 2;
  const [activeStep, setActiveStep] = useState<number>(minStep);

  const renderFormPage = (activeStep: number) => {
    if (!coupon) {
      return null;
    }

    switch (activeStep) {
      case 0:
        return (
          <CampaignCharitySelection
            primaryDonorName={coupon.campaign.primaryDonor.name}
            couponDenomination={coupon.denomination}
            campaignCharities={coupon.charities}
            name="campaignCharityId"
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
      case 1:
        return (
          <RedeemFormButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            minStep={minStep}
            maxStep={maxStep}
          />
        );
      case 2:
        return (
          <RedeemFormButtons
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
        <Stack component="div" spacing={2}>
          <RedeemStepper activeStep={activeStep} />

          {coupon && (
            <Formik initialValues={redeemFormValues} validationSchema={validationSchema} onSubmit={() => undefined}>
              {() => renderFormPage(activeStep)}
            </Formik>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Redeem;
