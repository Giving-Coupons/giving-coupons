import { CampaignCharityData } from '../../types/campaignCharities';
import Receipt from './Receipt';
import { Stack } from '@mui/system';
import Button from '../generic/Button';
import { PrimaryDonorData } from '../../types/primaryDonor';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
interface Props {
  campaignId: number;
  campaignCharity: CampaignCharityData;
  primaryDonor: PrimaryDonorData;
  primaryDonorAmount: number;
  secondaryDonorAmount: number;
}

const AlreadyRedeemedDisplay = ({
  campaignId,
  campaignCharity,
  primaryDonor,
  primaryDonorAmount,
  secondaryDonorAmount,
}: Props) => {
  const router = useRouter();

  return (
    <Stack component="div" spacing={4}>
      <Typography variant="h2" align="center">
        This coupon has been redeemed
      </Typography>

      <Receipt
        charity={campaignCharity.charity}
        couponSponsorship={{ primaryDonor, primaryDonorAmount }}
        secondaryDonorAmount={secondaryDonorAmount}
      />

      <Button actionType="primary" onClick={() => router.push(`/campaigns/${campaignId}/contribute`)}>
        Contribute directly
      </Button>
    </Stack>
  );
};

export default AlreadyRedeemedDisplay;
