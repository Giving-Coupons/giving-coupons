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
  const primaryFraction = campaignCharity.primaryDonor.fraction;
  const secondaryFraction = campaignCharity.secondaryDonors.fraction;

  const bars =
    primaryFraction !== null && secondaryFraction !== null
      ? [
          { fraction: primaryFraction, label: `$${campaignCharity.primaryDonor.amount}` },
          { fraction: secondaryFraction, label: `$${campaignCharity.secondaryDonors.amount}` },
        ]
      : [{ fraction: 1 }];

  return (
    <Stack direction="row" sx={donationBreakdownItemContainer} spacing={2}>
      <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
      <HorizontalBarGraph bars={bars} overrideLastBarSx={rightBarSx} labelProps={{ variant: 'h4' }} />
    </Stack>
  );
}
