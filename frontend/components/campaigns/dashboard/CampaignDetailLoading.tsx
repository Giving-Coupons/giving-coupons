import { Container, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';

const CampaignDetailLoading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={7}>
                <Stack component="div" spacing={1}>
                  <Skeleton variant="rectangular" height="5vh" />
                  <Skeleton variant="rectangular" height="2.5vh" />
                  <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                    <Skeleton variant="rectangular" width="100%" height="30vh" />

                    <Stack spacing={1} sx={{ width: '100%' }}>
                      <Skeleton variant="rectangular" width="100%" height="15vh" />
                      <Skeleton variant="rectangular" width="100%" height="15vh" />
                    </Stack>
                  </Stack>
                  <Skeleton variant="rectangular" height="4vh" />
                </Stack>

                {!isMobile && (
                  <Grid item xs={12} marginTop={2}>
                    <Stack direction="row" spacing={4}>
                      <Skeleton variant="rectangular" width="100%" height="20vh" />
                      <Skeleton variant="rectangular" width="100%" height="20vh" />
                      <Skeleton variant="rectangular" width="100%" height="20vh" />
                    </Stack>
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                <Stack component="div" spacing={1}>
                  <Skeleton variant="rectangular" height="5vh" />
                  <Skeleton variant="rectangular" height="2.5vh" />
                  <Skeleton variant="rectangular" height="50vh" />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {isMobile && (
          <Grid item xs={12}>
            <Stack direction="row" spacing={4}>
              <Skeleton variant="rectangular" width="100%" height="25vh" />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CampaignDetailLoading;
