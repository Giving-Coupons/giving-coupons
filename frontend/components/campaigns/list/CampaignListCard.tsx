import { Grid, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import { useRouter } from 'next/router';
import {
  buttonSx,
  charityLogoSx,
  descriptionContainerSx,
  descriptionSx,
  graphContainerSx,
  graphSx,
} from '../../../styles/components/campaigns/list/CampaignListCardStyles';
import { CampaignListData } from '../../../types/campaigns';
import { log } from '../../../utils/analytics';
import { isNowBetweenInclusive } from '../../../utils/dates';
import CompetingGraph from '../../charts/CompetingGraph';
import Button from '../../generic/Button';
import CardWithImage from '../../generic/CardWithImage';

interface Props {
  campaign: CampaignListData;
}

const CampaignListCard = ({ campaign }: Props) => {
  const router = useRouter();

  const primaryDonorDonationData = campaign.donations.primaryDonation;
  const secondaryDonorDonationData = campaign.donations.secondaryDonation;

  const imageOverlayContent = (
    <Container sx={graphContainerSx} component="div">
      <CompetingGraph
        overrideGraphSx={graphSx}
        topLabelTitle={`$${primaryDonorDonationData.amount}`}
        topLabels={[`from ${campaign.primaryDonorName}`]}
        bottomLabelTitle={`$${secondaryDonorDonationData.amount}`}
        bottomLabels={['from the public']}
        barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
      />
    </Container>
  );

  const description = (
    <Stack key="description" sx={descriptionContainerSx} component="div">
      <Typography variant="h3">{campaign.name}</Typography>

      <Typography variant="caption">For the following beneficiaries</Typography>

      <Grid container>
        {campaign.charities.map((charity, index) => (
          <Grid item xs={12 / 5} key={index}>
            <Box sx={charityLogoSx} component="img" src={charity.logoBase64} />
          </Grid>
        ))}
      </Grid>

      <Typography sx={descriptionSx} variant="caption">
        {campaign.description}
      </Typography>
    </Stack>
  );

  const actionButtons = (
    <Box key="actionButtons">
      {isNowBetweenInclusive(campaign.start, campaign.end) && (
        <Button
          sx={buttonSx}
          actionType="primary"
          onClick={() => {
            log('[CampaignListCard] Click "Contribute"', { campaignId: campaign.id });
            router.push(`/campaigns/${campaign.id}/contribute`);
          }}
        >
          Contribute
        </Button>
      )}

      <Button
        sx={buttonSx}
        actionType="tertiary"
        onClick={() => {
          log(`[CampaignListCard] Click 'Learn more'`, { campaignId: campaign.id });
          router.push(`/campaigns/${campaign.id}`);
        }}
      >
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
