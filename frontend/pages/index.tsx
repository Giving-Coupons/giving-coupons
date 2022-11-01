import { Grid, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  desktopDescriptionTextSx,
  desktopHeadlineTextContainerSx,
  desktopHeadlineTextSx,
  headlineBackgroundSx,
  highlightedTextSx,
  mobileDescriptionTextSx,
  mobileHeadlineTextContainerSx,
  mobileHeadlineTextSx,
  sectionSx,
  desktopHeadlineScreenImageSx,
  mobileHeadlineScreenImageSx,
  mobileHeadlineImageContainerSx,
} from '../styles/indexStyles';
import { combineSxProps } from '../utils/types';
import Typed from 'react-typed';
import Button from '../components/generic/Button';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const headlineTextContainerSx = isMobile ? mobileHeadlineTextContainerSx : desktopHeadlineTextContainerSx;
  const headlineTextSx = isMobile ? mobileHeadlineTextSx : desktopHeadlineTextSx;
  const descriptionTextSx = isMobile ? mobileDescriptionTextSx : desktopDescriptionTextSx;
  const headlineScreenImageSx = isMobile ? mobileHeadlineScreenImageSx : desktopHeadlineScreenImageSx;

  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>

      <Stack component="main" alignItems="center">
        {isMobile ? (
          <Box sx={headlineBackgroundSx} component="img" src="/landing-page/mobile-header-background.png" />
        ) : (
          <Box sx={headlineBackgroundSx} component="img" src="/landing-page/desktop-header-background.png" />
        )}

        <Grid sx={sectionSx} container>
          <Grid sx={headlineTextContainerSx} item xs={12} md={8}>
            <Typography sx={headlineTextSx}>Giving the</Typography>

            <Typography sx={combineSxProps(headlineTextSx, highlightedTextSx)}>Gift of Giving</Typography>

            <Typography sx={descriptionTextSx}>Experience and share the joy of giving by</Typography>

            <Typed
              style={descriptionTextSx}
              strings={[
                'empowering others to give',
                'learning how your donations helps charities',
                'directing donations to beneficiaries',
                'donating to charities',
              ]}
              typeSpeed={40}
              loop
            />

            <br />
            <br />

            <Button actionType="primary" onClick={() => router.push('/campaigns')}>
              Explore our campaigns now
            </Button>
          </Grid>

          <Grid item xs={12} md={4} sx={isMobile ? mobileHeadlineImageContainerSx : {}}>
            <Box sx={headlineScreenImageSx} component="img" src="/landing-page/redeem-screen.png" />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Home;
