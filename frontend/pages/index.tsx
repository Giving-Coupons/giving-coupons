import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/generic/Button';
import { Box, Stack } from '@mui/system';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import {
  buttonSx,
  marTop2rem,
  marTop5,
  marTop10,
  marLeft10,
  marRight10,
  largeFont,
  impactText,
  section,
  pageBreak,
} from '../styles/indexStyles';
import Image from 'next/image';
import ResponsiveImage from '../components/ResponsiveImage';
import ButtonCard from '../components/ButtonCard';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Image src="/nusstudents.png" layout="responsive" width="100%" height="100%"></Image>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} display="flex" alignItems="center" justifyContent="center">
          <Stack justifyContent="center" alignItems="flex-start" height="100%" width="80%">
            <Typography variant="h5" align="center" textAlign="left" fontWeight="900">
              Together, we are more
            </Typography>
            <Typography
              sx={marTop5}
              variant="subtitle"
              align="center"
              fontSize="20px"
              textAlign="left"
              fontWeight="500"
            >
              Giving coupons is an initiative to raise money for charities through public gift matching
            </Typography>
            <Button sx={buttonSx} actionType="primary" href="/campaigns">
              Explore Our Campaigns
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Stack sx={marTop2rem} direction="column" justifyContent="center" alignItems="center">
        <Typography sx={marTop10} variant="h1" align="center">
          To Date
        </Typography>
        <Box width="80%">
          <Grid sx={marTop2rem} container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
              <Stack direction="column" justifyContent="flex-start" alignItems="center">
                <Box
                  sx={{ display: 'block', height: '100px', width: '100px' }}
                  component="img"
                  src="/icon-charity.png"
                />
                <Typography sx={[impactText, largeFont]}>$4,500</Typography>
                <Typography variant="subtitle1">Additional funds raised for charity</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
              <Stack sx={marTop2rem} direction="column" justifyContent="flex-start" alignItems="center">
                <Box
                  sx={{ display: 'block', height: '100px', width: '100px' }}
                  component="img"
                  src="/icon-voucher.png"
                />
                <Typography sx={[impactText, largeFont]}>632</Typography>
                <Typography variant="subtitle1">Coupons issued</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
              <Stack sx={marTop2rem} direction="column" justifyContent="flex-start" alignItems="center">
                <Box sx={{ display: 'block', height: '100px', width: '100px' }} component="img" src="/icon-love.png" />
                <Typography sx={[impactText, largeFont]}>20972</Typography>
                <Typography variant="subtitle1">Lives impacted</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      <ResponsiveImage />

      <Box sx={[marTop2rem, section]}>
        <Stack
          sx={{ width: '90%', maxWidth: '600px', height: '100%', padding: '16px' }}
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={marTop10} variant="h1" align="center">
            How it Works
          </Typography>

          <Stack
            sx={marTop10}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            width="100%"
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box
                sx={{ display: 'block', height: '60px', width: '60px' }}
                component="img"
                src="/public-relation.png"
              />
              <Stack direction="column" justifyContent="space-between" alignItems="flex-start">
                <Typography sx={marLeft10} variant="h2">
                  Donors commit a sum to one or more charities
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={marTop10}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={2}
            width="100%"
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
                <Typography sx={marRight10} variant="h2" align="right">
                  Giving coupons generate coupons
                </Typography>
              </Stack>
              <Box sx={{ display: 'block', height: '60px', width: '60px' }} component="img" src="/icon-voucher.png" />
            </Stack>
          </Stack>

          <Stack
            sx={marTop10}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            width="100%"
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ display: 'block', height: '60px', width: '60px' }} component="img" src="/icon-charity.png" />
              <Box>
                <Typography sx={marLeft10} variant="h2">
                  Coupon recipients choose which charities gets the donation
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Stack sx={pageBreak} height="30vh" direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Typography sx={marTop2rem} variant="h1" align="center">
          Join Our Mission
        </Typography>
        <Grid sx={pageBreak} container spacing={2} alignItems="center" justifyContent="center" maxWidth="1000px">
          <Grid item xs={12} sm={12} md={6} lg={6} display="flex" alignItems="center" justifyContent="center">
            <ButtonCard
              title="Create a Campaign"
              content="Commit a sum and generate coupons to spread the gift of giving"
              link="/interest"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} display="flex" alignItems="center" justifyContent="center">
            <ButtonCard
              title="Contribute to a campaign"
              content="Learn more about existing campaigns and contribute directly"
              link="/campaigns"
            />
          </Grid>
        </Grid>
      </Stack>

      <Stack
        direction="column"
        width="100%"
        height="30vh"
        justifyContent="flex-end"
        alignItems="flex-start"
        padding="10px"
        spacing={2}
      >
        <Typography sx={marTop10} variant="subtitle">
          Giving Coupons 2022
        </Typography>
      </Stack>
    </Box>
  );
};

export default Home;
