import { Stack, Typography } from '@mui/material';
import { accordionStackSx } from '../../../styles/components/charities/CampaignCharityOverviewStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { getCampaignStatus } from '../../../utils/campaigns';
import CampaignCharityAccordionCard from './CampaignCharityAccordionCard';

interface Props {
  campaign: CampaignPublicData;
}

const CampaignCharityOverview = ({ campaign }: Props) => {
  const campaignStatus = getCampaignStatus(campaign.start, campaign.end);
  const campaignIsActive = campaignStatus === 'Active';
  const campaignIsUpcoming = campaignStatus === 'Upcoming';
  const campaignHasEnded = campaignStatus === 'Completed';

  return (
    <Stack spacing={1}>
      <Stack>
        <Typography variant="h1">Charities</Typography>

        {campaignIsUpcoming && <Typography>Here are the charities involved in this campaign!</Typography>}

        {campaignIsActive && <Typography>Here&apos;s how each charity is benefitting from the campaign!</Typography>}

        {campaignHasEnded && <Typography>Here&apos;s how each charity has benefitted from this campaign!</Typography>}
      </Stack>

      <Stack sx={accordionStackSx}>
        {campaign.charities.map((campaignCharity, index) => (
          <CampaignCharityAccordionCard key={index} campaignCharity={campaignCharity} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CampaignCharityOverview;
