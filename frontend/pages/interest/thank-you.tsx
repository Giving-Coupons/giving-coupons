import { NextPage } from 'next';
import Lottie from 'lottie-react';
import orangeTick from '../../assets/orangeTickLottie.json';
import { Box, Container, Stack, Typography } from '@mui/material';
import { stackSx } from '../../styles/interest/thankyou';

const ThankYou: NextPage = () => {
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Stack spacing={2} sx={stackSx}>
          <Box>
            <Lottie autoPlay loop={false} animationData={orangeTick} />
          </Box>
          <Typography variant="h1">Thank you for getting in touch!</Typography>
          <Typography variant="body1" textAlign="center">
            We are excited to find new partners and bring the gift of giving to more people.
            <br />
            Give us some time to go over your submission, and we will reach out by email to contact you.
          </Typography>
        </Stack>
      </Container>
    </div>
  );
};
export default ThankYou;
