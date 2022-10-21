import { Stack } from '@mui/material';
import React from 'react';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityListItem from './CampaignCharityListItem';

type Props = {
  campaignCharities: CampaignCharityDonationPublicData[];
};

export default function CampaignCharityList({ campaignCharities }: Props) {
  const maxTotalDonation = Math.max(
    ...campaignCharities.map(
      (campaignCharity) => campaignCharity.primaryDonation.amount + campaignCharity.secondaryDonation.amount,
    ),
  );

  const calculateBoxWidth = (campaignCharity: CampaignCharityDonationPublicData) => {
    if (maxTotalDonation === 0) {
      return 100;
    }

    const totalDonation = campaignCharity.primaryDonation.amount + campaignCharity.secondaryDonation.amount;
    return totalDonation / maxTotalDonation;
  };

  return (
    <Stack spacing={2}>
      {campaignCharities.map((campaignCharity, index) => (
        <CampaignCharityListItem
          key={index}
          campaignCharity={campaignCharity}
          width={calculateBoxWidth(campaignCharity)}
        />
      ))}
    </Stack>
  );
}
