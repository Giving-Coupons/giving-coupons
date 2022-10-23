import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

const RedeemLoading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack component="div" width="100%" spacing={2} alignItems="center">
      {[1, 2, 3, 4, 5].map((item) => (
        <Skeleton key={item} variant="rectangular" width={isMobile ? '100%' : '60%'} height="8vh" />
      ))}
    </Stack>
  );
};

export default RedeemLoading;
