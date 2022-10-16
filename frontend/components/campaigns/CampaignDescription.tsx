import { Stack, Typography } from '@mui/material';
import React from 'react';
import { closeQuotesProps } from '../../styles/components/campaigns/CampaignDescription';
import { CampaignPublicData } from '../../types/campaigns';
import Quotes from '../icons/Quotes';

type Props = {
  campaign: CampaignPublicData;
};

export default function CampaignDescription({ campaign }: Props) {
  return (
    <>
      <Typography variant="h2">About the campaign</Typography>

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