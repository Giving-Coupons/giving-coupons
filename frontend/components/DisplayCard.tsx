import { Box, Container, Stack, SxProps } from '@mui/system';
import { theme } from '../utils/theme';
import { Typography, Grid } from '@mui/material';
import Button from './Button';
import ImageWithOverlay from './ImageWithOverlay';

const borderRadius = '20px';
const graphBorderRadius = '200px';

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
  display: 'flex',
};

const graphLabelSx: SxProps = {
  color: '#FFFFFF',
  fontWeight: 600,
  lineHeight: 1.2,
};

const topGraphLabelSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
};

const bottomGraphLabelSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
};

const leftGraphSx: SxProps = {
  borderTop: '2px solid #FFFFFF',
  borderLeft: '2px solid #FFFFFF',
  borderBottom: '2px solid #FFFFFF',
  borderTopLeftRadius: graphBorderRadius,
  borderBottomLeftRadius: graphBorderRadius,
  backgroundColor: theme.palette.primaryTranslucent.main,
};

const rightGraphSx: SxProps = {
  border: '2px solid #FFFFFF',
  borderTopRightRadius: graphBorderRadius,
  borderBottomRightRadius: graphBorderRadius,
  backgroundColor: theme.palette.secondaryTranslucent.main,
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

const DisplayCard = () => {
  return (
    <Stack component="div" sx={containerSx}>
      <Box sx={imageContainerSx}>
        <ImageWithOverlay imageSrc="/sample.png">
          <Container sx={graphContainerSx} component="div">
            <Stack component="div" spacing={0.5}>
              <Box sx={topGraphLabelSx}>
                <Typography variant="caption" sx={graphLabelSx}>
                  $XX
                </Typography>
                <Typography variant="caption" sx={graphLabelSx}>
                  by the primary donor
                </Typography>
              </Box>

              <Box sx={graphSx}>
                <Box width={'60%'} sx={leftGraphSx} />
                <Box width={'40%'} sx={rightGraphSx} />
              </Box>

              <Box sx={bottomGraphLabelSx}>
                <Typography variant="caption" sx={graphLabelSx}>
                  $YY
                </Typography>
                <Typography variant="caption" sx={graphLabelSx}>
                  by the secondary donor
                </Typography>
              </Box>
            </Stack>
          </Container>
        </ImageWithOverlay>
      </Box>

      <Box sx={bottomContainerSx} component="div">
        <Stack sx={descriptionContainerSx} spacing={0.5}>
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
