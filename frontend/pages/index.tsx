import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/Button';
import { Box, Container, SxProps } from '@mui/system';

const examplesContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const examplesButtonSx: SxProps = {
  width: '50%',
  margin: '10px 0px',
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <Container>
          <h1>This is our app&apos;s theme</h1>

          <Box sx={examplesContainerSx}>
            <Button sx={examplesButtonSx} actionType="primary">
              Primary action button
            </Button>
            <Button sx={examplesButtonSx} actionType="secondary">
              Secondary action button
            </Button>
            <Button sx={examplesButtonSx} actionType="tertiary">
              Tertiary action button
            </Button>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default Home;
