import { Box, Stack } from '@mui/material';
import React from 'react';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityListItem from './CampaignCharityListItem';

type Props = {
  campaignCharities: CampaignCharityDonationPublicData[];
};

export default function CampaignCharityList({ campaignCharities }: Props) {
  const maxTotalDonation = Math.max(
    ...campaignCharities.map(
      (campaignCharity) => campaignCharity.primaryDonor.amount + campaignCharity.secondaryDonors.amount,
    ),
  );

  const calculateBoxWidth = (campaignCharity: CampaignCharityDonationPublicData) => {
    if (maxTotalDonation === 0) {
      return '100%';
    }

    const totalDonation = campaignCharity.primaryDonor.amount + campaignCharity.secondaryDonors.amount;
    return `${(totalDonation / maxTotalDonation) * 80}%`;
  };

  return (
    <Stack spacing={2}>
      {campaignCharities.map((campaignCharity, index) => (
        <Box key={index} style={{ width: calculateBoxWidth(campaignCharity) }}>
          <CampaignCharityListItem campaignCharity={campaignCharity} />
        </Box>
      ))}
    </Stack>
  );
}
