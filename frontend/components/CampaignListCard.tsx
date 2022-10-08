import { Box, Container, Stack } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import Button from './Button';
import CompetingGraph from './CompetingGraph';
import { CampaignListData } from '../types/campaigns';
import CardWithImage from './CardWithImage';
import {
  charityLogoSx,
  descriptionContainerSx,
  graphContainerSx,
  graphSx,
  buttonSx,
} from '../styles/components/CapaignListCardStyles';

interface Props {
  campaign: CampaignListData;
}

const CampaignListCard = ({ campaign }: Props) => {
  const primaryDonorDonationData = campaign.donations.primaryDonor;
  const secondaryDonorDonationData = campaign.donations.secondaryDonors;

  const imageOverlayContent = (
    <Container sx={graphContainerSx} component="div">
      <CompetingGraph
        overrideGraphSx={graphSx}
        topLabelTitle={`$${primaryDonorDonationData.amount}`}
        topLabels={['by the primary donor']}
        bottomLabelTitle={`$${secondaryDonorDonationData.amount}`}
        bottomLabels={['by the secondary donor']}
        barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
      />
    </Container>
  );

  const description = (
    <Stack sx={descriptionContainerSx} spacing={0.5} component="div">
      <Typography variant="h3">Campaign Name</Typography>

      <Typography variant="caption">For the following beneficiaries</Typography>

      <Grid container>
        {campaign.charities.map((charity, index) => (
          <Grid item xs={3} key={index}>
            <Box sx={charityLogoSx} component="img" src={charity.logoUrl} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption">{campaign.description}</Typography>
    </Stack>
  );

  const actionButtons = (
    <Box>
      <Button sx={buttonSx} actionType="primary">
        Contribute
      </Button>

      <Button sx={buttonSx} actionType="tertiary">
        Learn more
      </Button>
    </Box>
  );

  return (
    <CardWithImage
      imageUrl={campaign.imageUrl}
      imageOverlayContent={imageOverlayContent}
      descriptionContent={[description, actionButtons]}
    />
  );
};

export default CampaignListCard;
