import { Container, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { containerSx } from '../../../styles/campaigns/detailStyles';

const CampaignDetailLoading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container sx={containerSx}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" height="50vh" />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack component="div" spacing={2}>
                  <Skeleton variant="rectangular" height="5vh" />
                  <Skeleton variant="rectangular" height="2.5vh" />
                  <Skeleton variant="rectangular" height="15vh" />
                  <Skeleton variant="rectangular" height="15vh" />
                  <Skeleton variant="rectangular" height="5vh" />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {!isMobile && (
          <Grid item xs={12}>
            <Stack direction="row" spacing={4}>
              <Skeleton variant="rectangular" width="100%" height="25vh" />
              <Skeleton variant="rectangular" width="100%" height="25vh" />
              <Skeleton variant="rectangular" width="100%" height="25vh" />
            </Stack>
          </Grid>
        )}

        {isMobile && (
          <Grid item xs={12}>
            <Stack direction="row" spacing={4}>
              <Skeleton variant="rectangular" width="100%" height="25vh" />
            </Stack>
          </Grid>
        )}

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width="100%" height="8vh" />
              <Skeleton variant="rectangular" width="100%" height="5vh" />
            </Stack>

            <Stack spacing={1.5}>
              <Skeleton variant="rectangular" width="100%" height="10vh" />
              <Skeleton variant="rectangular" width="100%" height="10vh" />
              <Skeleton variant="rectangular" width="100%" height="10vh" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CampaignDetailLoading;
