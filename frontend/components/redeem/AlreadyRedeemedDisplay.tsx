import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { CampaignCharityData } from '../../types/campaignCharities';
import { CouponSponsorship } from '../../types/primaryDonor';
import Button from '../generic/Button';
import Receipt from './Receipt';

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
