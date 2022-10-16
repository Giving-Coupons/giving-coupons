import { Box, Container, Stack } from '@mui/system';
import { Typography } from '@mui/material';
import CompetingGraph from '../../charts/CompetingGraph';
import CardWithImage from '../../generic/CardWithImage';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import {
  charityLogoSx,
  descriptionContainerSx,
  graphContainerSx,
  graphSx,
  buttonSx,
  charityTitleSx,
} from '../../../styles/components/charities/CampaignCharityCardStyles';
import LinkIcon from '@mui/icons-material/Link';
import { useRouter } from 'next/router';
import Button from '../../generic/Button';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
  redirectTo: 'givingSgCampaign' | 'charity';
}

const CampaignCharityCard = ({ campaignCharity, redirectTo }: Props) => {
  const router = useRouter();

  const primaryDonorDonationData = campaignCharity.primaryDonor;
  const secondaryDonorDonationData = campaignCharity.secondaryDonors;

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
    <Stack key="description" sx={descriptionContainerSx} spacing={1} component="div">
      <Stack direction="row" sx={charityTitleSx} spacing={2}>
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
        <Typography variant="h3">{campaignCharity.charity.name}</Typography>
      </Stack>

      <Typography variant="subtitle1">{campaignCharity.charity.description}</Typography>
    </Stack>
  );

  const redirectUrl =
    redirectTo === 'givingSgCampaign' ? campaignCharity.givingSgUrl : campaignCharity.charity.websiteUrl;
  const redirectButtonText = redirectTo === 'givingSgCampaign' ? 'Go to Giving.sg Campaign' : 'Visit website';

  const actionButtons = (
    <Box key="actionButtons">
      <Button sx={buttonSx} actionType="tertiary" onClick={() => router.push(redirectUrl)}>
        <Stack direction="row" spacing={1}>
          <LinkIcon />
          <Typography>{redirectButtonText}</Typography>
        </Stack>
      </Button>
    </Box>
  );

  return (
    <CardWithImage
      imageUrl={campaignCharity.charity.imageBase64}
      imageOverlayContent={imageOverlayContent}
      descriptionContent={[description, actionButtons]}
    />
  );
};

export default CampaignCharityCard;
