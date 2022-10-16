import { Stack, Box, Typography } from '@mui/material';
import React from 'react';
import { charityLogoSx } from '../../styles/components/campaigns/CampaignListCardStyles';
import { rightBarSx } from '../../styles/components/charts/CompetingGraphStyles';
import { donationBreakdownItemContainer, donationBreakdownLabelSx } from '../../styles/pages/campaigns/detailStyles';
import { CampaignCharityDonationPublicData } from '../../types/campaignCharities';
import HorizontalBarGraph from '../charts/HorizontalBarGraph';

type Props = {
  width: number;
  campaignCharity: CampaignCharityDonationPublicData;
};

export default function CampaignCharityListItem({ width, campaignCharity }: Props) {
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
      <Stack sx={donationBreakdownLabelSx} spacing={1}>
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

        <Typography variant="h4">{campaignCharity.charity.name}</Typography>
      </Stack>

      <Box sx={{ width: `calc(80% * ${width})` }}>
        <HorizontalBarGraph bars={bars} overrideLastBarSx={rightBarSx} labelProps={{ variant: 'h4' }} />
      </Box>
    </Stack>
  );
}
