import { Box, Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { NextPage } from 'next';
import orangeTick from '../../assets/orangeTickLottie.json';
import { lottieSx, stackSx } from '../../styles/interest/thankyou';

const ThankYou: NextPage = () => {
  return (
    <Stack component="main" maxWidth="md" spacing={2} sx={stackSx}>
      <Box sx={lottieSx}>
        <Lottie autoPlay loop={false} animationData={orangeTick} />
      </Box>
      <Typography variant="h1" textAlign="center">
        Thank you for getting in touch!
      </Typography>
      <Typography variant="body1" textAlign="center">
        We are excited to work with you to bring the gift of giving to more people.
        <br />
        Give us some time to go over your submission, and we will reach out by email to contact you.
      </Typography>
    </Stack>
  );
};
export default ThankYou;
