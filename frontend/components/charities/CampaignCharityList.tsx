import { Box, Stack } from '@mui/material';
import React from 'react';
import { CampaignCharityDonationPublicData } from '../../types/campaignCharities';
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

  const getFractionOfMaxDonation = (campaignCharity: CampaignCharityDonationPublicData) => {
    const total = campaignCharity.primaryDonor.amount + campaignCharity.secondaryDonors.amount;
    return total / maxTotalDonation;
  };

  return (
    <Stack spacing={2}>
      {campaignCharities.map((campaignCharity, index) => (
        <Box key={index} style={{ width: `calc(80% * ${getFractionOfMaxDonation(campaignCharity)})` }}>
          <CampaignCharityListItem campaignCharity={campaignCharity} />
        </Box>
      ))}
    </Stack>
  );
}
