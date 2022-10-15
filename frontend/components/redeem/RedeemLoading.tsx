import { Grid, Skeleton, Stack } from '@mui/material';
import { containerSx } from '../../styles/redeem/indexStyles';
import { theme } from '../../utils/theme';

const RedeemLoading = () => {
  return (
    <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={2}>
      <Grid item md={12} lg={4} container paddingLeft={2} paddingRight={2} paddingBottom={2}>
        <Grid xs={12} item paddingLeft={2} paddingRight={2}>
          <Stack spacing={theme.spacing(2)}>
            <Stack spacing={theme.spacing(1)}>
              <Skeleton variant="rectangular" height="10vh" />
              <Skeleton variant="rectangular" height="30vh" />
            </Stack>

            <Skeleton variant="rectangular" height="50vh" />
          </Stack>
        </Grid>
      </Grid>

      <Grid item md={12} lg={8} container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height="50vh" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height="50vh" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height="50vh" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height="50vh" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RedeemLoading;
