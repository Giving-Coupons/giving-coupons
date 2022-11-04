import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { isInteger } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CampaignCouponsCard from '../../../../components/campaigns/dashboard/CampaignCouponsCard';
import CampaignDonationBreakdownCard from '../../../../components/campaigns/dashboard/CampaignDonationBreakdownCard';
import CampaignInfoCard from '../../../../components/campaigns/dashboard/CampaignInfoCard';
import CampaignLoading from '../../../../components/campaigns/dashboard/CampaignLoading';
import CampaignPrimaryDonorCard from '../../../../components/campaigns/dashboard/CampaignPrimaryDonorCard';
import api from '../../../../frontendApis';
import CampaignsAPI from '../../../../frontendApis/campaigns';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { containerSx, sectionSx } from '../../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignAdminData } from '../../../../types/campaigns';
import { Nullable } from '../../../../types/utils';

const AdminCampaign = () => {
  useAdminLoginCheck();
  const { query } = useRouter();
  const campaignId = query.campaignId && isInteger(query.campaignId) ? Number(query.campaignId) : null;
  const { data: campaign, error } = useSWR<Nullable<CampaignAdminData>>(
    `${CampaignsAPI.CAMPAIGNS_URL}/adminGet${campaignId}`,
    () => (campaignId !== null ? api.campaigns.adminGet(campaignId).then((res) => res.payload) : null),
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
          <Grid sx={containerSx} container rowSpacing={4}>
            <Grid item xs={12} md={8}>
              <Stack sx={sectionSx} component="div" spacing={4}>
                <CampaignInfoCard campaign={campaign} />

                <CampaignCouponsCard campaign={campaign} coupons={campaign.coupons} />
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
