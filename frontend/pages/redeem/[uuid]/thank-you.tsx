import { Box, Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { NextPage } from 'next';
import orangeThankYou from '../../../assets/orangeThankYouLottie.json';
import { lottieContainerSx, lottieFrameSx, stackSx } from '../../../styles/redeem/thankYou';

const ThankYou: NextPage = () => {
  return (
    <Stack component="main" maxWidth="md" spacing={2} sx={stackSx}>
      <Box sx={lottieContainerSx}>
        <Box sx={lottieFrameSx}>
          <Lottie autoPlay loop={false} animationData={orangeThankYou} />
        </Box>
      </Box>
      <Typography variant="h3" textAlign="center" marginTop={-100}>
        Your gift will not just improve lives, it will transform futures. <br />
        Thank you for your generosity.
      </Typography>
    </Stack>
  );
};
export default ThankYou;
