import { Box, Grid, Radio, Stack, Typography } from '@mui/material';
import { isString } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import CampaignListCard from '../../../components/campaigns/CampaignListCard';
import Button from '../../../components/generic/Button';
import api from '../../../frontendApis';
import CouponsAPI from '../../../frontendApis/coupons';
import { containerSx } from '../../../styles/redeem/indexStyles';
import { CampaignListData } from '../../../types/campaigns';
import { CouponRedeemData } from '../../../types/coupons';
import { Nullable } from '../../../types/utils';
import { campaignImageBase64, logoBase64 } from '../../../utils/examples';
import { theme } from '../../../utils/theme';

const INITIAL_REDEEM_PAGE = 1;
const NUMBER_OF_REDEEM_PAGES = 2;

const sampleCharity: CharityListData = {
  id: 1,
  name: 'Beyond Social Services',
  logoBase64: logoBase64,
};

const sampleCampaign: CampaignListData = {
  id: 1,
  name: 'Campaign Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet accumsan dolor. Sed fermentum ex\n' +
    '            neque, sit amet dapibus ante rutrum non.',
  imageBase64: campaignImageBase64,
  charities: Array(4).fill(sampleCharity),
  donations: {
    primaryDonor: {
      amount: 60,
      fraction: 0.6,
    },
    secondaryDonors: {
      amount: 40,
      fraction: 0.4,
    },
  },
  couponsRedeemedCount: 0,
};

const sampleCampaigns: CampaignListData[] = Array(11).fill(sampleCampaign);

const Redeem: NextPage = () => {
  const router: NextRouter = useRouter();
  const { urlToken } = router.query;

  if (!urlToken || !isString(urlToken)) {
    router.push('/');
  }

  const { data: coupon } = useSWR<Nullable<CouponRedeemData>>(CouponsAPI.COUPONS_URL, () =>
    api.coupons.getCoupon(urlToken as string).then((r) => r.payload),
  );

  const [redeemPageIndex, setRedeemPageIndex] = useState<number>(INITIAL_REDEEM_PAGE);

  const goToNextPage = () => {
    setRedeemPageIndex((prev) => Math.min(prev + 1, NUMBER_OF_REDEEM_PAGES));
  };

  const goToPreviousPage = () => {
    setRedeemPageIndex((prev) => Math.max(prev - 1, INITIAL_REDEEM_PAGE));
  };

  const [campaignCharityId, setCampaignCharityId] = useState<Nullable<number>>(null);
  const [amount, setAmount] = useState<number>(0);

  const renderRedeemPage = () => {
    switch (redeemPageIndex) {
      case 1:
        return (
          <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={2}>
            <Grid item md={12} lg={4} container paddingLeft={2} paddingRight={2} paddingBottom={2}>
              <Grid item>
                <Stack spacing={theme.spacing(2)}>
                  <Typography variant="h2">{coupon?.campaign.name}</Typography>

                  <Typography variant="h2">Background info?</Typography>

                  <Typography variant="h2">Quote thing</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Grid item md={12} lg={8} container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
              {sampleCampaigns.map((campaign, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="flex-start"
                    onClick={() => setCampaignCharityId(campaign.id)}
                  >
                    <Radio checked={campaignCharityId === campaign.id} value={campaign.id} />
                    <CampaignListCard campaign={campaign} />
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
              <Button actionType="primary" onClick={() => goToNextPage()}>
                Next
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={2}>
            <Grid item md={12} lg={4} container paddingLeft={2} paddingRight={2} paddingBottom={2}>
              <Grid item>
                <Stack spacing={theme.spacing(2)}>
                  <Typography variant="h2">Campaign Name</Typography>

                  <Typography variant="h2">Background info?</Typography>

                  <Typography variant="h2">Quote thing</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Grid item md={12} lg={8} container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
              <Grid item xs={12}>
                <Typography variant="h2">
                  You have empowered CAMPAIGN NAME and their beneficiary with CAMPAIGN DENOMINTATION.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h2">Would you like to add a personal contribution?</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h2">
                  STATS: 90% of coupon givers have made a personal contribution. Join them and make a bigger difference!
                </Typography>
              </Grid>

              <Grid item xs={12} flexDirection="row-reverse" container spacing={1}>
                <Grid item xs={12} alignItems="center" justifyContent="center" container>
                  <Button fullWidth actionType="primary" onClick={() => goToNextPage()}>
                    Make a personal contribution
                  </Button>
                </Grid>
                <Grid item xs={12} alignItems="center" justifyContent="center" container>
                  <Button fullWidth actionType="secondary" onClick={() => goToNextPage()}>
                    Continue without a personal contribution
                  </Button>
                </Grid>
                <Grid item xs={12} alignItems="center" justifyContent="center" container>
                  <Button fullWidth actionType="tertiary" onClick={() => goToPreviousPage()}>
                    Change beneficiary
                  </Button>
                </Grid>
              </Grid>
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
