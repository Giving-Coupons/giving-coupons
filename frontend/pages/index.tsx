import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/generic/Button';
import { Box, Stack } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import {
  buttonSx,
  contrastText,
  examplesContainerSx,
  graphSx,
  imageContainerSx,
  imageOverlaySx,
  imageSx,
  primaryTranslucentOverlaySx,
  secondaryTranslucentOverlaySx,
} from '../styles/indexStyles';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Stack component="main" spacing={2}>
        <Typography variant="h1" align="center">
          [h1] This is our app&apos;s theme
        </Typography>

        <Typography variant="h2" align="center">
          [h2] Refer to index.tsx to see some examples
        </Typography>

        <Typography variant="h3" align="center">
          [h3] Refer to index.tsx to see some examples
        </Typography>

        <Typography variant="h4" align="center">
          [h4] Refer to index.tsx to see some examples
        </Typography>

        <Typography variant="h5" align="center">
          [h5] Why are you still reading this
        </Typography>

        <Typography variant="h6" align="center">
          [h6] Why are you still reading this
        </Typography>

        <Typography variant="subtitle1" align="center" sx={contrastText}>
          [subtitle1] Test contrasting color
        </Typography>

        <Typography variant="subtitle2" align="center" sx={contrastText}>
          [subtitle2] Test contrasting color
        </Typography>

        <Typography variant="body1" align="center" sx={contrastText}>
          [body1] Test contrasting color
        </Typography>

        <Typography variant="body2" align="center" sx={contrastText}>
          [body2] Test contrasting color
        </Typography>

        <Typography variant="button" align="center" sx={contrastText}>
          [button] Test contrasting color
        </Typography>

        <Typography variant="caption" align="center" sx={contrastText}>
          [caption] Test contrasting color
        </Typography>

        <Box sx={examplesContainerSx}>
          <Box sx={imageContainerSx}>
            <Box sx={imageOverlaySx} />

            <Box sx={imageSx} component="img" src="/sample.png" />

            <Grid container sx={graphSx}>
              <Grid item xs={7} sx={primaryTranslucentOverlaySx}>
                Primary Translucent
              </Grid>

              <Grid item xs={5} sx={secondaryTranslucentOverlaySx}>
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
    </div>
  );
};

export default Home;
