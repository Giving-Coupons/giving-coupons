import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import api from '../../../frontendApis';
import {
  couponsTableContainerSx,
  couponsTableHeaderSx,
  expiredCouponSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignAdminData, CouponRegenerationFormData } from '../../../types/campaigns';
import { CouponListData } from '../../../types/coupons';
import { DATE_FORMAT } from '../../../utils/constants';
import Button from '../../generic/Button';
import SimpleTable from '../../generic/SimpleTable';
import Tabbed from '../../Tabs';
import CouponRegenerationFormDialog from '../form/CouponRegenerationFormDialog';
import CampaignCard from './CampaignCard';

interface Props {
  campaign: CampaignAdminData;
  coupons: CouponListData[];
}

const CampaignCouponsCard = ({ campaign, coupons }: Props) => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const handleClose = () => setIsDialogOpen(false);

  const onSubmitForm = (values: CouponRegenerationFormData) => {
    api.campaigns.regenerateExpiredCoupons(campaign.id, values);
    handleClose();
  };

  const makeCouponsTable = (coupons: CouponListData[]) => (
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
          key: 'redemption',
          transformValue: (redemption) => redemption?.charity.name ?? 'Not redeemed yet',
          getSortValue: (redemption) => redemption?.charity.name,
          notPresentIs: 'last',
        },
        {
          title: 'Secondary donation',
          key: 'redemption',
          transformValue: (redemption) =>
            redemption?.secondaryDonation?.amount ? `$${redemption?.secondaryDonation.amount}` : '-',
          getSortValue: (redemption) => redemption?.secondaryDonation?.amount,
          notPresentIs: 'last',
        },
        {
          title: 'Expires At',
          key: 'expiresAt',
          transformValue: (expiresAt) => expiresAt.format(DATE_FORMAT),
          getSortValue: (expiresAt) => expiresAt.valueOf(),
        },
      ]}
      rows={coupons}
      shouldUsePaper={false}
      rowSxSelector={({ expiresAt, redemption }) => (expiresAt.isBefore() && !redemption ? expiredCouponSx : {})}
    />
  );

  const expiredAndUnredeemedCoupons = coupons.filter((coupon) => coupon.expiresAt.isBefore() && !coupon.redemption);
  const redeemedCoupons = coupons.filter((coupon) => coupon.redemption);
  const unredeemedCoupons = coupons.filter((coupon) => !coupon.expiresAt.isBefore() && !coupon.redemption);

  return (
    <CampaignCard>
      <Stack sx={couponsTableHeaderSx} component="div" direction="row" spacing={2}>
        <Typography variant="h3" flex={2}>
          Coupons
        </Typography>

        <CouponRegenerationFormDialog
          isOpen={isDialogOpen}
          onClose={handleClose}
          onSubmit={onSubmitForm}
          campaignStartDate={campaign.start}
          campaignEndDate={campaign.end}
        />

        <Button actionType="secondary" onClick={() => setIsDialogOpen(true)}>
          Regenerate expired coupons
        </Button>

        <Button actionType="primary" onClick={() => router.push(`/admin/campaigns/${campaign.id}/coupons`)}>
          Download for distribution
        </Button>
      </Stack>

      <Tabbed
        tabs={[
          { label: 'All', content: makeCouponsTable(coupons) },
          { label: 'Unredeemed', content: makeCouponsTable(unredeemedCoupons) },
          { label: 'Redeemed', content: makeCouponsTable(redeemedCoupons) },
          { label: 'Expired', content: makeCouponsTable(expiredAndUnredeemedCoupons) },
        ]}
      />
    </CampaignCard>
  );
};

export default CampaignCouponsCard;
