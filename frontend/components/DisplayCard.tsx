import { Box, Container, Stack, SxProps } from '@mui/system';
import { theme } from '../utils/theme';
import { Typography, Grid } from '@mui/material';
import Button from './Button';
import ImageWithOverlay from './ImageWithOverlay';
import CompetingGraph from './CompetingGraph';

const borderRadius = '20px';

const containerSx: SxProps = {
  alignItems: 'center',
  height: '100%',
  boxShadow: `0px 0px 8px 0px ${theme.palette.neutral.light}`,
  borderRadius: borderRadius,
};

const imageContainerSx: SxProps = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '40%',
  height: '40%',
  maxHeight: '40%',
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
};

const graphContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  height: '100%',
  paddingBottom: '8px',
};

const graphSx: SxProps = {
  height: '1em',
  width: '100%',
};

const bottomContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '4px 0',
  width: '90%',
  height: '100%',
};

const descriptionContainerSx: SxProps = {
  width: '100%',
  overflow: 'auto',
};

const beneficiaryLogoSx: SxProps = {
  maxHeight: '48px',
  minHeight: '48px',
  height: '48px',
};

const buttonSx: SxProps = {
  width: '100%',
};

const topLabels = ['$XX', 'by the primary donor'];
const bottomLabels = ['$YY', 'by the secondary donor'];
const barFractions = [0.6, 0.4];

const DisplayCard = () => {
  return (
    <Stack component="div" sx={containerSx}>
      <Box sx={imageContainerSx}>
        <ImageWithOverlay imageSrc="/sample.png">
          <Container sx={graphContainerSx} component="div">
            <CompetingGraph
              overrideGraphSx={graphSx}
              topLabels={topLabels}
              bottomLabels={bottomLabels}
              barFractions={barFractions}
            />
          </Container>
        </ImageWithOverlay>
      </Box>

      <Box sx={bottomContainerSx} component="div">
        <Stack sx={descriptionContainerSx} spacing={0.5} component="div">
          <Typography variant="h3">Campaign Name</Typography>
          <Typography variant="caption">For the following beneficiaries</Typography>

          <Grid container>
            {[1, 2, 3, 4].map((index) => (
              <Grid item xs={3} key={index}>
                <Box sx={beneficiaryLogoSx} component="img" src="/sample-beneficiary-logo.png" />
              </Grid>
            ))}
          </Grid>

          <Typography variant="caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet accumsan dolor. Sed fermentum ex
            neque, sit amet dapibus ante rutrum non.{' '}
          </Typography>
        </Stack>

        <Box>
          <Button sx={buttonSx} actionType="primary">
            Contribute
          </Button>

          <Button sx={buttonSx} actionType="tertiary">
            Learn more
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default DisplayCard;
