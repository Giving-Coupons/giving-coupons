import { Stack, Box } from '@mui/material';
import React from 'react';
import { charityLogoSx } from '../../styles/components/campaigns/CampaignListCardStyles';
import { rightBarSx } from '../../styles/components/charts/CompetingGraphStyles';
import { donationBreakdownItemContainer } from '../../styles/pages/campaigns/detailStyles';
import { CampaignCharityDonationPublicData } from '../../types/campaignCharities';
import HorizontalBarGraph from '../charts/HorizontalBarGraph';

type Props = {
  campaignCharity: CampaignCharityDonationPublicData;
};

export default function CampaignCharityListItem({ campaignCharity }: Props) {
  return (
    <Stack direction="row" sx={donationBreakdownItemContainer} spacing={2}>
      <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
      <HorizontalBarGraph
        bars={[
          { fraction: campaignCharity.primaryDonor.fraction, label: `$${campaignCharity.primaryDonor.amount}` },
          {
            fraction: campaignCharity.secondaryDonors.fraction,
            label: `$${campaignCharity.secondaryDonors.amount}`,
          },
        ]}
        overrideLastBarSx={rightBarSx}
        labelProps={{ variant: 'h4' }}
      />
    </Stack>
  );
}
