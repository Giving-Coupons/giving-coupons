import { Stack, Box, Typography } from '@mui/material';
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
  const { amount: primaryAmount, fraction: primaryFraction } = campaignCharity.primaryDonor;
  const { amount: secondaryAmount, fraction: secondaryFraction } = campaignCharity.primaryDonor;
  const totalAmount = primaryAmount + secondaryAmount;
  const hasDonations = totalAmount > 0;

  const bars =
    primaryFraction !== null && secondaryFraction !== null
      ? [
          { fraction: primaryFraction, label: `$${primaryAmount}` },
          { fraction: secondaryFraction, label: `$${secondaryAmount}` },
        ]
      : [{ fraction: 1, label: `$${primaryAmount || secondaryAmount}` }];

  return (
    <Stack direction="row" sx={donationBreakdownItemContainer} spacing={2}>
      <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
      {hasDonations ? (
        <HorizontalBarGraph bars={bars} overrideLastBarSx={rightBarSx} labelProps={{ variant: 'h4' }} />
      ) : (
        <Typography variant="body1">No donations to date ☹</Typography>
      )}
    </Stack>
  );
}
