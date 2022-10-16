import { Stack } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';
import CampaignCard from './CampaignCard';
import { sectionSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';

const CampaignLoading = () => (
  <Grid container>
    <Grid item sm={12} md={8}>
      <Stack sx={sectionSx} spacing={2}>
        <Grid container columnSpacing={2}>
          <Grid item sm={12} md={6}>
            <Skeleton variant="rectangular" height="50vh" />
          </Grid>

          <Grid item sm={12} md={6}>
            <Stack component="div" spacing={2}>
              <Skeleton variant="rectangular" />
              <Skeleton variant="rectangular" />
              <Skeleton variant="rectangular" height="15vh" />
              <Skeleton variant="rectangular" height="15vh" />
            </Stack>
          </Grid>
        </Grid>

        <CampaignCard>
          <Stack component="div" spacing={2}>
            <Skeleton variant="rectangular" width="55vw" height="10vh" />
            <Skeleton variant="rectangular" width="55vw" height="10vh" />
            <Skeleton variant="rectangular" width="55vw" height="10vh" />
          </Stack>
        </CampaignCard>
      </Stack>
    </Grid>

    <Grid item sm={12} md={4}>
      <Stack sx={sectionSx} spacing={2}>
        <CampaignCard>
          <Stack component="div" spacing={2}>
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
          </Stack>
        </CampaignCard>

        <CampaignCard>
          <Stack component="div" spacing={2}>
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
            <Skeleton variant="rectangular" width="20vw" height="10vh" />
          </Stack>
        </CampaignCard>
      </Stack>
    </Grid>
  </Grid>
);

export default CampaignLoading;
