import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  charityGraphInfoStackSx,
  charityGraphStackSx,
  charityInfoBoxSx,
  charityLogoContainerSx,
  charityLogoSx,
  graphSx,
  gridSx,
} from '../../../styles/components/charities/CampaignCharityCardStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import SmallCompetingGraph from '../../charts/SmallCompetingGraph';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
  onClick?: () => void;
  handleOpenInfoCard?: () => void;
}

const CampaignCharityCard = ({ campaignCharity, onClick, handleOpenInfoCard }: Props) => {
  const primaryDonorDonationData = campaignCharity.primaryDonation;
  const secondaryDonorDonationData = campaignCharity.secondaryDonation;

  return (
    <Grid container justifyContent="center" alignItems="center" sx={gridSx} onClick={onClick}>
      <Grid item xs={2} sx={charityLogoContainerSx}>
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
      </Grid>

      <Grid item xs={10}>
        <Stack direction="row" spacing={-1} sx={charityGraphInfoStackSx}>
          <Stack sx={charityGraphStackSx}>
            <Typography variant="h4">{campaignCharity.charity.name}</Typography>

            <SmallCompetingGraph
              overrideGraphSx={graphSx}
              leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
              rightLabel={`$${secondaryDonorDonationData.amount} from people like you`}
              barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
            />
          </Stack>

          <Box sx={charityInfoBoxSx}>
            <IconButtonWithTooltip icon={<InfoOutlined />} tooltip="More Info" onClick={handleOpenInfoCard} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CampaignCharityCard;
