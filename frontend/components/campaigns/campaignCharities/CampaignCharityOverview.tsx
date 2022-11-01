import { Stack, Typography } from '@mui/material';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityAccordionCard from './CampaignCharityAccordionCard';

interface Props {
  campaignCharities: CampaignCharityDonationPublicData[];
}

const CampaignCharityOverview = ({ campaignCharities }: Props) => {
  return (
    <>
      <Stack>
        <Typography variant="h1">Charities</Typography>

        <Typography>Here&apos;s how each charity is benefitting from the campaign!</Typography>
      </Stack>

      <Stack spacing={1.5}>
        {campaignCharities.map((campaignCharity, index) => (
          <CampaignCharityAccordionCard key={index} campaignCharity={campaignCharity} />
        ))}
      </Stack>
    </>
  );
};

export default CampaignCharityOverview;
