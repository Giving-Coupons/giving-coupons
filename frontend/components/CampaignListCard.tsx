import { Box, Container, Stack, SxProps } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import Button from './Button';
import CompetingGraph from './CompetingGraph';
import { CampaignListData } from '../types/campaigns';
import CardWithImage from './CardWithImage';

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

interface Props {
  campaign: CampaignListData;
}

const CampaignListCard = ({ campaign }: Props) => {
  const primaryDonorDonationData = campaign.donations.primaryDonor;
  const secondaryDonorDonationData = campaign.donations.secondaryDonors;
  const topLabels = [`$${primaryDonorDonationData.amount}`, 'by the primary donor'];
  const bottomLabels = [`$${secondaryDonorDonationData.amount}`, 'by the secondary donor'];
  const barFractions = [primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction];

  const imageOverlayContent = (
    <Container sx={graphContainerSx} component="div">
      <CompetingGraph
        overrideGraphSx={graphSx}
        topLabels={topLabels}
        bottomLabels={bottomLabels}
        barFractions={barFractions}
      />
    </Container>
  );

  const descriptionContent = (
    <>
      <Stack sx={descriptionContainerSx} spacing={0.5} component="div">
        <Typography variant="h3">Campaign Name</Typography>

        <Typography variant="caption">For the following beneficiaries</Typography>

        <Grid container>
          {campaign.charities.map((charity, index) => (
            <Grid item xs={3} key={index}>
              <Box sx={beneficiaryLogoSx} component="img" src={charity.logoUrl} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption">{campaign.description}</Typography>
      </Stack>

      <Box>
        <Button sx={buttonSx} actionType="primary">
          Contribute
        </Button>

        <Button sx={buttonSx} actionType="tertiary">
          Learn more
        </Button>
      </Box>
    </>
  );

  return (
    <CardWithImage
      imageUrl={campaign.imageUrl}
      imageOverlayContent={imageOverlayContent}
      descriptionContent={descriptionContent}
    />
  );
};

export default CampaignListCard;
