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
  pageBreak,
  section100,
  section,
  centralize,
  heroImg,
  impactIconImg,
  stepsContainer,
  stepsIconImg,
} from '../styles/indexStyles';
import ResponsiveImage from '../components/home/ResponsiveImage';
import ButtonCard from '../components/home/ButtonCard';
import { combineSxProps } from '../utils/types';
import { theme } from '../utils/theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home: NextPage = () => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>
      <Grid sx={section100} container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={heroImg} component="img" src="/nusstudents.png" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} display="flex" alignItems="flex-start" justifyContent="center">
          <Stack justifyContent="center" alignItems="flex-start" height="100%" width="80%">
            <Typography variant="hero" align="center" textAlign="left" fontWeight="900">
              Together, we are more
            </Typography>
            <Typography
              sx={marTop5}
              variant="subtitle1"
              align="center"
              fontSize="20px"
              textAlign="left"
              fontWeight="500"
            >
              Giving Coupons is an initiative to raise money for charities through public gift matching
            </Typography>
            <Button sx={buttonSx} actionType="primary" href="/campaigns">
              Explore Our Campaigns
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid sx={matches ? section : section100} container spacing={0} alignItems="flex-start" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            To Date
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
          <Stack direction="column" display="flex" justifyContent="center" alignItems="center">
            <Box sx={impactIconImg} component="img" src="/icon-charity.png" />
            <Typography sx={combineSxProps(impactText, largeFont)}>$4,500</Typography>
            <Typography variant="subtitle1">Additional funds raised for charity</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
          <Stack sx={marTop2rem} direction="column" justifyContent="center" alignItems="center">
            <Box  sx={impactIconImg} component="img" src="/icon-voucher.png" />
            <Typography sx={combineSxProps(impactText, largeFont)}>632</Typography>
            <Typography variant="subtitle1">Coupons issued</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
          <Stack sx={marTop2rem} direction="column" justifyContent="center" alignItems="center">
            <Box sx={impactIconImg} component="img" src="/icon-love.png" />
            <Typography sx={combineSxProps(impactText, largeFont)}>20972</Typography>
            <Typography variant="subtitle1">Lives impacted</Typography>
          </Stack>
        </Grid>
      </Grid>

      <ResponsiveImage />

      <Box sx={matches ? combineSxProps(section, centralize) : combineSxProps(section100, centralize)}>
        <Grid sx={stepsContainer} container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography sx={marTop10} variant="h1" align="center">
              How It Works
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              sx={marTop10}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              width="100%"
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box sx={stepsIconImg} component="img" src="/public-relation.png" />
                <Stack direction="column" justifyContent="space-between" alignItems="flex-start">
                  <Typography sx={marLeft10} variant="h3">
                    Donors commit a sum to one or more charities
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
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
                  <Typography sx={marRight10} variant="h3" align="right">
                    Giving Coupons generates coupons
                  </Typography>
                </Stack>
                <Box sx={stepsIconImg} component="img" src="/icon-voucher.png" />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack
              sx={marTop10}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              width="100%"
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box sx={stepsIconImg} component="img" src="/icon-charity.png" />
                <Box>
                  <Typography sx={marLeft10} variant="h3">
                    Coupon recipients choose which charities gets the donation
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Stack height="30vh" direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Typography sx={marTop2rem} variant="h1" align="center">
          Join Our Mission
        </Typography>
        <Grid
          sx={pageBreak}
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth="1000px"
        >
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
        <Typography sx={marTop10} variant="subtitle1">
          Giving Coupons 2022
        </Typography>
      </Stack>
    </Box>
  );
};

export default Home;
