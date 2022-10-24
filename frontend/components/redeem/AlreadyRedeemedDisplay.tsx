import { CampaignCharityData } from '../../types/campaignCharities';
import Receipt from './Receipt';
import { Stack } from '@mui/system';
import Button from '../generic/Button';
import { CouponSponsorship } from '../../types/primaryDonor';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
  campaignId: number;
  campaignCharity: CampaignCharityData;
  couponSponsorship: CouponSponsorship;
  secondaryDonorAmount: number;
}

const AlreadyRedeemedDisplay = ({ campaignId, campaignCharity, couponSponsorship, secondaryDonorAmount }: Props) => {
  const router = useRouter();

  return (
    <Stack component="div" spacing={4}>
      <Typography variant="h2" align="center">
        This coupon has been redeemed
      </Typography>

      <Receipt
        charity={campaignCharity.charity}
        couponSponsorship={couponSponsorship}
        secondaryDonorAmount={secondaryDonorAmount}
      />

      <Button actionType="primary" onClick={() => router.push(`/campaigns/${campaignId}/contribute`)}>
        Contribute directly
      </Button>
    </Stack>
  );
};

export default AlreadyRedeemedDisplay;
