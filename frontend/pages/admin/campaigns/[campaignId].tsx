import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { CampaignAdminData } from '../../../types/campaigns';
import moment from 'moment';
import { campaignImageBase64, logoBase64 } from '../../../utils/examples';
import { CampaignCharityData, CampaignCharityDonationData } from '../../../types/campaignCharities';
import { DonationBreakdownData } from '../../../types/donations';
import { CouponListData } from '../../../types/coupons';
import { sectionSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import CampaignInfoCard from '../../../components/campaigns/dashboard/CampaignInfoCard';
import CampaignDonationBreakdownCard from '../../../components/campaigns/dashboard/CampaignDonationBreakdownCard';
import CampaignCouponsCard from '../../../components/campaigns/dashboard/CampaignCouponsCard';
import React from 'react';
import CampaignPrimaryDonorCard from '../../../components/campaigns/dashboard/CampaignPrimaryDonorCard';
import { useRouter } from 'next/router';
import { isInteger } from 'formik';
import api from '../../../frontendApis';
import useSWR from 'swr';
import { Nullable } from '../../../types/utils';

const sampleCampaignCharities: CampaignCharityData[] = [
  { id: 1, charity: { id: 1, name: 'Ark', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
  { id: 2, charity: { id: 2, name: 'Bob', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
  { id: 3, charity: { id: 3, name: 'Charlie', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
];

const sampleCampaignCharitiesWithDonation: CampaignCharityDonationData[] = sampleCampaignCharities.map(
  (sampleCharities) => ({
    ...sampleCharities,
    primaryDonor: { amount: 60, fraction: 0.6 },
    secondaryDonors: { amount: 40, fraction: 0.4 },
  }),
);

const sampleDonations: DonationBreakdownData = {
  primaryDonor: { amount: 180, fraction: 0.6 },
  secondaryDonors: { amount: 120, fraction: 0.4 },
};

const sampleCoupons: CouponListData[] = [
  {
    id: 1,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: { id: 1, amount: 2, campaignCharityId: 1, couponId: 1 },
  },
  { id: 2, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  {
    id: 3,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  { id: 4, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  { id: 5, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  {
    id: 6,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  {
    id: 7,
    urlToken: 'abcdef',
    charity: { id: 2, name: 'Bob' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: { id: 2, amount: 8, campaignCharityId: 2, couponId: 7 },
  },
  {
    id: 8,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  {
    id: 9,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
];

const sampleCampaign: CampaignAdminData = {
  id: 1,
  name: 'Chicken Soup for the Soul',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales pretium felis, eget convallis magna consectetur vitae. Vestibulum aliquam at felis sed mattis. Nulla facilisi. Vivamus ultrices sed leo eget tempor. Sed gravida consectetur finibus. Proin accumsan sit amet ipsum ut posuere.',
  promisedAmount: 1000,
  couponDenomination: 10,
  start: moment(),
  end: moment(),
  imageBase64: campaignImageBase64,
  interestId: null,
  primaryDonor: {
    id: 1,
    name: 'Bob the Builder',
    email: 'canyoufixit@gmail.com',
  },
  charities: sampleCampaignCharitiesWithDonation,
  donations: sampleDonations,
  coupons: sampleCoupons,
};

const AdminCampaign = () => {
  const { query } = useRouter();
  const campaignId = query.campaignId && isInteger(query.campaignId) ? Number(query.campaignId) : null;
  const { data: campaign, error } = useSWR<Nullable<CampaignAdminData>>([campaignId], (campaignId) =>
    campaignId !== null ? api.campaigns.adminGet(campaignId).then((res) => res.payload) : null,
  );

  const isLoading = !campaign && !error;

  return (
    <Box>
      <Head>
        <title>Manage Campaign</title>
      </Head>

      <Box component="main">
        {isLoading && (
          <Stack>
            <Typography variant="h1">Loading...</Typography>
          </Stack>
        )}

        {error && (
          <Stack spacing={2}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        )}

        {campaign && (
          <Grid container>
            <Grid item sm={12} md={8}>
              <Stack sx={sectionSx} component="div" spacing={4}>
                <CampaignInfoCard campaignBaseInfo={campaign} />

                <CampaignCouponsCard coupons={campaign.coupons} />
              </Stack>
            </Grid>

            <Grid item sm={12} md={4}>
              <Stack sx={sectionSx} component="div" spacing={4}>
                <CampaignDonationBreakdownCard
                  totalDonationBreakdown={campaign.donations}
                  charitiesDonations={campaign.charities}
                />

                <CampaignPrimaryDonorCard primaryDonor={campaign.primaryDonor} />
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AdminCampaign;
