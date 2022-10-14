import { Box, Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { NextPage } from 'next';
import orangeTick from '../../../assets/orangeTickLottie.json';
import { lottieSx, stackSx } from '../../../styles/redeem/thankYou';

const ThankYou: NextPage = () => {
  return (
    <Stack component="main" maxWidth="md" spacing={2} sx={stackSx}>
      <Box sx={lottieSx}>
        <Lottie autoPlay loop={false} animationData={orangeTick} />
      </Box>
      <Typography variant="h1" textAlign="center">
        Thank you for donating!
      </Typography>
      <Typography variant="body1" textAlign="center">
        Your gift will not just improve lives, it will transform futures. Thank you for your generosity.
      </Typography>
    </Stack>
  );
};
export default ThankYou;
