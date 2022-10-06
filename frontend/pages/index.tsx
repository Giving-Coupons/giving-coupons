import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/Button';
import { Box, Stack, SxProps } from '@mui/system';
import { theme } from '../utils/theme';
import { Grid } from '@mui/material';

const examplesContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonSx: SxProps = {
  width: '50%',
  margin: '10px 0px',
};

const imageContainerSx: SxProps = {
  position: 'relative',
};

const imageOverlaySx: SxProps = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.overlayTranslucent.main,
  zIndex: 10,
};

const graphSx: SxProps = {
  position: 'absolute',
  bottom: '2em',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '90%',
  height: '2em',
  zIndex: 20,
};

const primaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.primaryTranslucent.main,
};

const secondaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.secondaryTranslucent.main,
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <Stack spacing={2}>
          <h1>This is our app&apos;s theme</h1>

          <Box sx={examplesContainerSx}>
            <Box sx={imageContainerSx}>
              <Box sx={imageOverlaySx} />

              <Box component="img" src="sample.png" />

              <Grid container sx={graphSx}>
                <Grid xs={7} sx={primaryTranslucentOverlaySx}>
                  Primary Translucent
                </Grid>

                <Grid xs={5} sx={secondaryTranslucentOverlaySx}>
                  Secondary Translucent
                </Grid>
              </Grid>
            </Box>

            <Button sx={buttonSx} actionType="primary">
              Primary action button
            </Button>

            <Button sx={buttonSx} actionType="secondary">
              Secondary action button
            </Button>

            <Button sx={buttonSx} actionType="tertiary">
              Tertiary action button
            </Button>
          </Box>
        </Stack>
      </main>
    </div>
  );
};

export default Home;
