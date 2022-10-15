import { sectionSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Stack } from '@mui/system';
import { DonationBreakdownData } from '../../../types/donations';
import { CampaignCharityDonationData } from '../../../types/campaignCharities';
import React from 'react';
import CampaignDonationBreakdownCard from './CampaignDonationBreakdownCard';

interface Props {
  totalDonationBreakdown: DonationBreakdownData;
  charitiesDonations: CampaignCharityDonationData[];
}

const CampaignStatsView = ({ totalDonationBreakdown, charitiesDonations }: Props) => {
  return (
    <Stack sx={sectionSx} component="div" spacing={4}>
      <CampaignDonationBreakdownCard
        totalDonationBreakdown={totalDonationBreakdown}
        charitiesDonations={charitiesDonations}
      />
    </Stack>
  );
};

export default CampaignStatsView;
