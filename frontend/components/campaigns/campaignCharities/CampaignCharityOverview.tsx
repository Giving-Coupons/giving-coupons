import { Stack, Typography } from '@mui/material';
import { accordionStackSx } from '../../../styles/components/charities/CampaignCharityOverviewStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityAccordionCard from './CampaignCharityAccordionCard';

interface Props {
  campaignCharities: CampaignCharityDonationPublicData[];
}

const CampaignCharityOverview = ({ campaignCharities }: Props) => {
  return (
    <Stack spacing={1}>
      <Stack>
        <Typography variant="h1">Charities</Typography>

        <Typography>Here&apos;s how each charity is benefitting from the campaign!</Typography>
      </Stack>

      <Stack sx={accordionStackSx}>
        {campaignCharities.map((campaignCharity, index) => (
          <CampaignCharityAccordionCard key={index} campaignCharity={campaignCharity} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CampaignCharityOverview;
