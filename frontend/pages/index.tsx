import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/generic/Button';
import { Box, Stack } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import {
  hero,
  buttonSx,
  spacing2,
  marTop5,
  marTop10,
  marLeft10,
  marRight10,
  largeFont,
  impactText,
  gradientSection,
  buttonSecondary,
} from '../styles/indexStyles';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Giving Coupons</title>
      </Head>
      <Box sx={hero}>
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          <div style={{ display: 'block', height: '400px', width: '400px' }}>
            <Image src="/nusstudents.png" layout="responsive" width="400px" height="400px"></Image>
          </div>
          <Typography variant="h1" align="center">
            Together, we are more
          </Typography>
          <Typography sx={marTop5} variant="h3" align="center">
            Giving coupons is an initiative to raise money for charities through public gift matching
          </Typography>
          <Button sx={buttonSx} actionType="primary">
            Explore Our Campaigns
          </Button>
        </Stack>
      </Box>

      <Box sx={spacing2}>
        <Typography sx={marTop10} variant="h1" align="center">
          To Date
        </Typography>
        <Stack sx={spacing2} direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column" justifyContent="flex-start" alignItems="center">
            <div style={{ display: 'block', height: '100px', width: '100px' }}>
              <Image src="/icon-charity.png" layout="responsive" width="100px" height="100px"></Image>
            </div>
            <Typography sx={[impactText, largeFont]}>$4,500</Typography>
            <Typography variant="subtitle1">Additional funds raised for charity</Typography>
          </Stack>

          <Stack sx={spacing2} direction="column" justifyContent="flex-start" alignItems="center">
            <div style={{ display: 'block', height: '100px', width: '100px' }}>
              <Image src="/icon-voucher.png" layout="responsive" width="100px" height="100px"></Image>
            </div>
            <Typography sx={[impactText, largeFont]}>632</Typography>
            <Typography variant="subtitle1">Coupons issued</Typography>
          </Stack>

          <Stack sx={spacing2} direction="column" justifyContent="flex-start" alignItems="center">
            <div style={{ display: 'block', height: '100px', width: '100px' }}>
              <Image src="/icon-love.png" layout="responsive" width="100px" height="100px"></Image>
            </div>
            <Typography sx={[impactText, largeFont]}>20972</Typography>
            <Typography variant="subtitle1">Lives impacted</Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={[spacing2, gradientSection]}>
        <Stack
          sx={{ height: '70vh', padding: '16px' }}
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={marTop10} variant="h1" align="center">
            3 Simple Steps
          </Typography>
          <Stack sx={marTop10} direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div style={{ display: 'block', height: '100px', width: '100px' }}>
                <Image src="/icon-give-money.png" layout="responsive" width="100px" height="100px"></Image>
              </div>
              <Stack direction="column" justifyContent="space-between" alignItems="flex-start">
                <Typography sx={marLeft10} variant="h2">
                  Receive a coupon from one of our distributors
                </Typography>
                <Button sx={buttonSecondary} actionType="tertiary">
                  Request for a coupon
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={marTop10} direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
                <Typography sx={marRight10} variant="h2" align="right">
                  Select a charity that you want to donate to
                </Typography>
                <Button sx={buttonSecondary} actionType="tertiary">
                  Our Partners
                </Button>
              </Stack>
              <div style={{ display: 'block', height: '100px', width: '100px' }}>
                <Image src="/icon-community.png" layout="responsive" width="100px" height="100px"></Image>
              </div>
            </Stack>
          </Stack>

          <Stack sx={marTop10} direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div style={{ display: 'block', height: '100px', width: '100px' }}>
                <Image src="/icon-give-love.png" layout="responsive" width="100px" height="100px"></Image>
              </div>
              <Box>
                <Typography sx={marLeft10} variant="h2">
                  Contribute your own money if you can
                </Typography>
                <Button sx={buttonSecondary} actionType="tertiary">
                  Donate directly
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
