import { Box, Grid, InputAdornment, Radio, Stack, Typography } from '@mui/material';
import { Form, Formik, isString } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import CampaignDescription from '../../../components/campaigns/CampaignDescription';
import CampaignCharityCard from '../../../components/charities/CampaignCharityCard';
import CampaignCharityList from '../../../components/charities/CampaignCharityList';
import FormTextInput from '../../../components/forms/FormTextInput';
import Button from '../../../components/generic/Button';
import api from '../../../frontendApis';
import CouponsAPI from '../../../frontendApis/coupons';
import { containerSx } from '../../../styles/redeem/indexStyles';
import { CouponRedeemData } from '../../../types/coupons';
import { Nullable } from '../../../types/utils';
import { theme } from '../../../utils/theme';
import { makeMockCampaignCharity } from '../../campaigns/mock';

const INITIAL_REDEEM_PAGE = 1;
const NUMBER_OF_REDEEM_PAGES = 2;

export const couponRedeemFormSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required.')
    .typeError('Amount must be a number.')
    .integer('Amount must be an integer.')
    .positive('Amount must be a positive.'),
});

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && isString(router.query.urlToken) ? router.query.urlToken : null;

  const { data: coupon } = useSWR<Nullable<CouponRedeemData>>(CouponsAPI.COUPONS_URL, () =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );

  const [campaignCharityId, setCampaignCharityId] = useState<Nullable<number>>(null);
  const [amount, setAmount] = useState<number>(0);

  const [redeemPageIndex, setRedeemPageIndex] = useState<number>(INITIAL_REDEEM_PAGE);

  const goToNextPage = () => {
    setRedeemPageIndex((prev) => Math.min(prev + 1, NUMBER_OF_REDEEM_PAGES));
  };

  const goToPreviousPage = () => {
    setRedeemPageIndex((prev) => Math.max(prev - 1, INITIAL_REDEEM_PAGE));
  };

  if (!coupon) {
    return null;
  }

  const renderRedeemPage = () => {
    switch (redeemPageIndex) {
      case 1:
        return (
          <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={2}>
            <Grid item md={12} lg={4} container paddingLeft={2} paddingRight={2} paddingBottom={2}>
              <Grid xs={12} item paddingLeft={2} paddingRight={2}>
                <Stack spacing={theme.spacing(2)}>
                  <Stack spacing={theme.spacing(1)}>
                    <Typography variant="h2">{coupon.campaign.name}</Typography>
                    <CampaignDescription campaign={coupon.campaign} />
                  </Stack>

                  <CampaignCharityList campaignCharities={coupon.charities} />
                </Stack>
              </Grid>
            </Grid>

            <Grid item md={12} lg={8} container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
              <Grid xs={12} padding={2}>
                <Typography textAlign="center">You can make a difference too. Choose a coupon recipient!</Typography>

                <Typography variant="h3" textAlign="center" color={theme.palette.primary.main}>
                  Choose a coupon recipient!
                </Typography>
              </Grid>

              {coupon.charities.map((campaignCharity, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="flex-start"
                    onClick={() => setCampaignCharityId(campaignCharity.id)}
                  >
                    <Radio checked={campaignCharityId === campaignCharity.id} value={campaignCharity.id} />
                    <CampaignCharityCard campaignCharity={makeMockCampaignCharity(1)} />
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Grid
              item
              xs={12}
              alignItems="flex-end"
              justifyContent="flex-end"
              container
              paddingLeft={2}
              paddingRight={2}
              paddingBottom={2}
            >
              <Button actionType="primary" disabled={!campaignCharityId} onClick={() => goToNextPage()}>
                Next
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={10}>
            <Grid item xs={12} sm={6} md={4} container paddingLeft={2} paddingRight={2}>
              <Grid item>
                <CampaignCharityCard campaignCharity={makeMockCampaignCharity(1)} />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
              <Stack spacing={theme.spacing(2)} padding={2}>
                <Typography textAlign="center">
                  You have empowered {coupon.campaign.name} and their beneficiary with $
                  {coupon.campaign.couponDenomination}.
                </Typography>

                <Typography variant="h4" textAlign="center">
                  Would you like to add a personal contribution?
                </Typography>

                <Formik
                  initialValues={{ amount: 0 }}
                  validationSchema={couponRedeemFormSchema}
                  onSubmit={(values: { amount: number }) =>
                    couponRedeemFormSchema.validate(values).then(() => setAmount(values.amount))
                  }
                >
                  {({ isValid, dirty }) => (
                    <Form>
                      <Stack spacing={theme.spacing(2)}>
                        <FormTextInput
                          name="amount"
                          label="Amount"
                          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        />

                        <Button
                          type="submit"
                          disabled={!isValid || !dirty}
                          fullWidth
                          actionType="primary"
                          onClick={() => goToNextPage()}
                        >
                          Make a personal contribution
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>

                <Button fullWidth actionType="secondary" onClick={() => goToNextPage()}>
                  Continue without a personal contribution
                </Button>

                <Button fullWidth actionType="tertiary" onClick={() => goToPreviousPage()}>
                  Change beneficiary
                </Button>
              </Stack>
            </Grid>
          </Grid>
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

      {renderRedeemPage()}
    </Box>
  );
};

export default Redeem;
