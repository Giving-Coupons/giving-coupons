import { Box, Container, Stack } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import Button from '../../generic/Button';
import CompetingGraph from '../../charts/CompetingGraph';
import { CampaignListData } from '../../../types/campaigns';
import CardWithImage from '../../generic/CardWithImage';
import {
  charityLogoSx,
  descriptionContainerSx,
  graphContainerSx,
  graphSx,
  buttonSx,
} from '../../../styles/components/campaigns/list/CampaignListCardStyles';
import { useRouter } from 'next/router';

interface Props {
  campaign: CampaignListData;
}

const CampaignListCard = ({ campaign }: Props) => {
  const router = useRouter();

  const primaryDonorDonationData = campaign.donations.primaryDonor;
  const secondaryDonorDonationData = campaign.donations.secondaryDonors;

  const imageOverlayContent = (
    <Container sx={graphContainerSx} component="div">
      <CompetingGraph
        overrideGraphSx={graphSx}
        topLabelTitle={`$${primaryDonorDonationData.amount}`}
        topLabels={['by the primary donor']}
        bottomLabelTitle={`$${secondaryDonorDonationData.amount}`}
        bottomLabels={['by the secondary donors']}
        barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
      />
    </Container>
  );

  const description = (
    <Stack key="description" sx={descriptionContainerSx} spacing={0.5} component="div">
      <Typography variant="h3">{campaign.name}</Typography>

      <Typography variant="caption">For the following beneficiaries</Typography>

      <Grid container>
        {campaign.charities.map((charity, index) => (
          <Grid item xs={12 / 5} key={index}>
            <Box sx={charityLogoSx} component="img" src={charity.logoBase64} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption">{campaign.description}</Typography>
    </Stack>
  );

  const actionButtons = (
    <Box key="actionButtons">
      <Button sx={buttonSx} actionType="primary">
        Contribute
      </Button>

      <Button sx={buttonSx} actionType="tertiary" onClick={() => router.push(`/campaigns/${campaign.id}`)}>
        Learn more
      </Button>
    </Box>
  );

  return (
    <CardWithImage
      imageUrl={campaign.imageBase64}
      imageOverlayContent={imageOverlayContent}
      descriptionContent={[description, actionButtons]}
    />
  );
};

export default CampaignListCard;
