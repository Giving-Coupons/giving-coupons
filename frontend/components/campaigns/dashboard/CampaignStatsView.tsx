import { sectionSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Stack } from '@mui/system';
import { DonationBreakdownData } from '../../../types/donations';
import { CampaignCharityDonationData } from '../../../types/campaignCharities';
import React from 'react';
import CampaignDonationBreakdownCard from './CampaignDonationBreakdownCard';
import CampaignCouponsCard from './CampaignCouponsCard';
import { CouponListData } from '../../../types/coupons';

interface Props {
  totalDonationBreakdown: DonationBreakdownData;
  charitiesDonations: CampaignCharityDonationData[];
  coupons: CouponListData[];
}

const CampaignStatsView = ({ totalDonationBreakdown, charitiesDonations, coupons }: Props) => {
  return (
    <Stack sx={sectionSx} component="div" spacing={4}>
      <CampaignDonationBreakdownCard
        totalDonationBreakdown={totalDonationBreakdown}
        charitiesDonations={charitiesDonations}
      />

      <CampaignCouponsCard coupons={coupons} />
    </Stack>
  );
};

export default CampaignStatsView;
