import CampaignCard from './CampaignCard';
import { Typography } from '@mui/material';
import React from 'react';
import SimpleTable from '../../generic/SimpleTable';
import { CouponListData } from '../../../types/coupons';
import { Box, Stack } from '@mui/system';
import {
  couponsTableContainerSx,
  couponsTableHeaderSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import Button from '../../generic/Button';
import { useRouter } from 'next/router';

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

      <Box sx={couponsTableContainerSx}>
        <SimpleTable
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
      </Box>
    </CampaignCard>
  );
};

export default CampaignCouponsCard;
