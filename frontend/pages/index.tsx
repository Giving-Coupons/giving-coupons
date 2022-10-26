import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ButtonCard from '../components/ButtonCard';
import Button from '../components/generic/Button';
import {
  buttonSx,
  callToActionSectionGridItemSx,
  callToActionStackSx,
  charityImageBlobResponsiveSx,
  charityImageLargeResponsiveSx,
  givingCouponsNoticeSx,
  headlineImageSx,
  headlineSectionBoxResponsiveSx,
  headlineTextGridSx,
  headlineTextStackSx,
  howItWorksHeaderSx,
  howItWorksImageSx,
  howItWorksSectionSx,
  howItWorksStackSx,
  largeImpactTextSx,
  orgDescriptionSx,
  statsSectionGridItemStackSx,
  statsSectionGridItemSx,
  statsSectionGridSx,
  statsSectionImageSx,
  statsSectionSx,
} from '../styles/indexStyles';
import { log } from '../utils/analytics';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>

      <HeadlineSection />

      <StatsSection />

      <ResponsiveCharityImage />

      <HowItWorksSection />

      <CallToActionSection />

      <Stack sx={givingCouponsNoticeSx}>
        <Typography variant="subtitle1">© Giving Coupons 2022</Typography>
      </Stack>
    </Box>
  );
};

const HeadlineSection = () => (
  // Adds bottom margin if breakpoint < md to account for extra length from text below image.
  <Grid sx={headlineSectionBoxResponsiveSx} container spacing={2}>
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Box sx={headlineImageSx} component="img" src="/nusstudents.png" />
    </Grid>

    <Grid item xs={12} sm={12} md={6} lg={6} sx={headlineTextGridSx}>
      <Stack sx={headlineTextStackSx}>
        <Typography variant="hero" align="center" textAlign="left" fontWeight="900">
          Together, we are more
        </Typography>

        <Typography
          sx={orgDescriptionSx}
          variant="subtitle1"
          align="center"
          fontSize="20px"
          textAlign="left"
          fontWeight="500"
        >
          Giving Coupons is an initiative to raise money for charities through public gift matching
        </Typography>

        <Button
          sx={buttonSx}
          actionType="primary"
          href="/campaigns"
          onClick={() => {
            log('[Home] Click "Explore our campaigns"');
          }}
        >
          Explore Our Campaigns
        </Button>
      </Stack>
    </Grid>
  </Grid>
);

const StatsSection = () => {
  const StatItem = (props: { imgSrc: string; stat: string; subtitle: string }) => (
    <Grid item xs={12} sm={12} md={4} lg={4} sx={statsSectionGridItemSx}>
      <Stack sx={statsSectionGridItemStackSx}>
        <Box sx={statsSectionImageSx} component="img" src={props.imgSrc} />

        <Typography sx={largeImpactTextSx}>{props.stat}</Typography>

        <Typography variant="subtitle1">{props.subtitle}</Typography>
      </Stack>
    </Grid>
  );

  return (
    <Stack sx={statsSectionSx}>
      <Typography variant="h1" align="center">
        To Date
      </Typography>

      <Box width="80%">
        <Grid sx={statsSectionGridSx} container spacing={2}>
          <StatItem imgSrc="/icon-charity.png" stat="$4,500" subtitle="Additional funds raised for charity" />

          <StatItem imgSrc="/icon-voucher.png" stat="632" subtitle="Coupons issued" />

          <StatItem imgSrc="/icon-love.png" stat="20972" subtitle="Lives impacted" />
        </Grid>
      </Box>
    </Stack>
  );
};

const ResponsiveCharityImage = () => (
  <>
    {/* Hides if breakpoint >= md */}
    <Box sx={charityImageBlobResponsiveSx} component="img" src="/charity-image-blob.png" />
    {/* Shows if breakpoint < md */}
    <Box sx={charityImageLargeResponsiveSx} component="img" src="/charity-image.png" />
  </>
);

const HowItWorksSection = () => {
  const GridItem = (props: { imgSrc: string; text: string; alignTo: 'start' | 'end' }) => (
    <Grid item xs={12}>
      <Stack sx={howItWorksStackSx} alignItems={props.alignTo === 'start' ? 'flex-start' : 'flex-end'} spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={props.alignTo === 'start' ? 'row' : 'row-reverse'}
        >
          <Box sx={howItWorksImageSx} component="img" src={props.imgSrc} />

          <Typography sx={{ margin: '2rem' }} variant="h3">
            {props.text}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );

  return (
    <Grid sx={howItWorksSectionSx} container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={howItWorksHeaderSx} variant="h1">
          How It Works
        </Typography>
      </Grid>

      <GridItem imgSrc="/public-relation.png" text="Donors commit a sum to one or more charities" alignTo="start" />

      <GridItem text="Giving Coupons generates coupons" imgSrc="/icon-voucher.png" alignTo="end" />

      <GridItem
        imgSrc="/icon-charity.png"
        text="Coupon recipients choose which charities gets the donation"
        alignTo="start"
      />
    </Grid>
  );
};
const CallToActionSection = () => {
  const router = useRouter();

  return (
    <Stack sx={callToActionStackSx} spacing={2}>
      <Typography variant="h1" align="center">
        Join Our Mission
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center" width="100%" maxWidth="1000px">
        <Grid item xs={12} sm={12} md={6} lg={6} sx={callToActionSectionGridItemSx}>
          <ButtonCard
            title="Create a Campaign"
            content="Commit a sum and generate coupons to spread the gift of giving"
            onClick={() => {
              log('[Home] Click "Create a Campaign"');
              router.push('/interest');
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} sx={callToActionSectionGridItemSx}>
          <ButtonCard
            title="Contribute to a campaign"
            content="Learn more about existing campaigns and contribute directly"
            onClick={() => {
              log('[Home] Click "Contribute to a campaign"');
              router.push('/campaigns');
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
