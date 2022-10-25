import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import {
  couponsTableContainerSx,
  couponsTableHeaderSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CouponListData } from '../../../types/coupons';
import Button from '../../generic/Button';
import SimpleTable from '../../generic/SimpleTable';
import CampaignCard from './CampaignCard';

interface Props {
  campaignId: number;
  coupons: CouponListData[];
}

const CampaignCouponsCard = ({ campaignId, coupons }: Props) => {
  const router = useRouter();

  return (
    <CampaignCard>
      <Stack sx={couponsTableHeaderSx} component="div" direction="row">
        <Typography variant="h3">Coupons</Typography>

        <Button actionType="primary" onClick={() => router.push(`/admin/campaigns/${campaignId}/coupons`)}>
          View unredeemed
        </Button>
      </Stack>

      <SimpleTable
        sx={couponsTableContainerSx}
        columns={[
          { title: 'ID', key: 'id' },
          { title: 'Url Token', key: 'urlToken' },
          {
            title: 'Denomination',
            key: 'denomination',
            transformValue: (denomination: number) => `$${denomination}`,
          },
          {
            title: 'Charity',
            key: 'charity',
            transformValue: (charity) => charity?.name ?? 'Not redeemed yet',
          },
          {
            title: 'Secondary donation',
            key: 'secondaryDonation',
            transformValue: (secondaryDonation) => (secondaryDonation?.amount ? `$${secondaryDonation.amount}` : '-'),
          },
        ]}
        rows={coupons}
        shouldUsePaper={false}
      />
    </CampaignCard>
  );
};

export default CampaignCouponsCard;
