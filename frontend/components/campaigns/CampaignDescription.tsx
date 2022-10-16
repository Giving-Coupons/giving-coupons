import { Stack, Typography } from '@mui/material';
import { closeQuotesProps } from '../../styles/components/campaigns/CampaignDescription';
import { CampaignBaseData } from '../../types/campaigns';
import Quotes from '../icons/Quotes';

type Props = {
  campaign: CampaignBaseData;
};

export default function CampaignDescription({ campaign }: Props) {
  return (
    <>
      <Typography variant="body1">
        This campaign was started by <strong>{campaign.primaryDonor.name}</strong> who has generously committed
        <strong> ${campaign.promisedAmount}</strong> to the beneficiaries listed above.
      </Typography>

      <Stack>
        <Quotes variant="open" />

        <Typography variant="body1" align="center" color="contrast.dark">
          {campaign.description}
        </Typography>

        <Quotes variant="close" sxProps={closeQuotesProps} />
      </Stack>
    </>
  );
}
