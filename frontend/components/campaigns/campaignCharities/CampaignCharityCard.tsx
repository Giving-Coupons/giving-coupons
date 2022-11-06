import { InfoOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import {
  charityGraphStackSx,
  charityLogoSx,
  graphSx,
  stackSx,
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
    <Stack direction="row" justifyContent="space-evenly" alignItems="center" sx={stackSx} onClick={onClick}>
      <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoUrl} />

      <Stack sx={charityGraphStackSx}>
        <Typography variant="h4">{campaignCharity.charity.name}</Typography>

        <SmallCompetingGraph
          overrideGraphSx={graphSx}
          leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
          rightLabel={`$${secondaryDonorDonationData.amount} from people like you`}
          barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
        />
      </Stack>

      {handleOpenInfoCard && (
        <IconButtonWithTooltip icon={<InfoOutlined />} tooltip="More Info" onClick={handleOpenInfoCard} />
      )}
    </Stack>
  );
};

export default CampaignCharityCard;
