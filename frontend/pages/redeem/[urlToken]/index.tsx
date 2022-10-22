import { Box } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@mui/system';
import RedeemStepper from '../../../components/redeem/RedeemStepper';

const Redeem: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container component="main">
        <RedeemStepper activeStep={0} />
      </Container>
    </Box>
  );
};

export default Redeem;
