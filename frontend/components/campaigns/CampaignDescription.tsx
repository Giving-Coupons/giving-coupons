import { Typography } from '@mui/material';
import { CampaignBaseData } from '../../types/campaigns';
import CloseQuotes from '../icons/CloseQuotes';
import OpenQuotes from '../icons/OpenQuotes';

type Props = {
  campaign: CampaignBaseData;
};

export default function CampaignDescription({ campaign }: Props) {
  return (
    <>
      <Typography variant="h2">About the campaign</Typography>

      <Typography variant="body1">
        This campaign was started by <strong>{campaign.primaryDonor.name}</strong> who has generously committed
        <strong> ${campaign.promisedAmount}</strong> to the beneficiaries listed above.
      </Typography>

      <OpenQuotes />

      <Typography variant="body1" align="center">
        {campaign.description}
      </Typography>

      <CloseQuotes style={{ alignSelf: 'flex-end' }} />
    </>
  );
}
