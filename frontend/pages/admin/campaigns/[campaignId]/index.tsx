import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { CampaignAdminData } from '../../../../types/campaigns';
import { sectionSx } from '../../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import CampaignInfoCard from '../../../../components/campaigns/dashboard/CampaignInfoCard';
import CampaignDonationBreakdownCard from '../../../../components/campaigns/dashboard/CampaignDonationBreakdownCard';
import CampaignCouponsCard from '../../../../components/campaigns/dashboard/CampaignCouponsCard';
import React from 'react';
import CampaignPrimaryDonorCard from '../../../../components/campaigns/dashboard/CampaignPrimaryDonorCard';
import { useRouter } from 'next/router';
import { isInteger } from 'formik';
import api from '../../../../frontendApis';
import useSWR from 'swr';
import { Nullable } from '../../../../types/utils';
import CampaignLoading from '../../../../components/campaigns/dashboard/CampaignLoading';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import CampaignsAPI from '../../../../frontendApis/campaigns';

const AdminCampaign = () => {
  useAdminLoginCheck();
  const { query } = useRouter();
  const campaignId = query.campaignId && isInteger(query.campaignId) ? Number(query.campaignId) : null;
  const { data: campaign, error } = useSWR<Nullable<CampaignAdminData>>(`${CampaignsAPI.CAMPAIGNS_URL}/adminGet`, () =>
    campaignId !== null ? api.campaigns.adminGet(campaignId).then((res) => res.payload) : null,
  );
  const isLoading = !campaign && !error;

  return (
    <Box>
      <Head>
        <title>Manage Campaign</title>
      </Head>

      <Box component="main">
        {isLoading && <CampaignLoading />}

        {error && (
          <Stack spacing={2}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        )}

        {campaign && !error && (
          <Grid container>
            <Grid item xs={12} md={8}>
              <Stack sx={sectionSx} component="div" spacing={4}>
                <CampaignInfoCard campaign={campaign} />

                <CampaignCouponsCard coupons={campaign.coupons} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
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
