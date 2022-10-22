import { Skeleton, Stack } from '@mui/material';

const RedeemLoading = () => {
  return (
    <Stack component="div" width="100%" spacing={2} alignItems="center">
      <Skeleton variant="rectangular" width="60%" height="8vh" />

      <Skeleton variant="rectangular" width="60%" height="8vh" />

      <Skeleton variant="rectangular" width="60%" height="8vh" />

      <Skeleton variant="rectangular" width="60%" height="8vh" />

      <Skeleton variant="rectangular" width="60%" height="8vh" />
    </Stack>
  );
};

export default RedeemLoading;
