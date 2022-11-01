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
          {
            title: 'Expires At',
            key: 'expiresAt',
            transformValue: (expiresAt) => expiresAt.format(DATE_FORMAT),
          },
        ]}
        rows={coupons}
        shouldUsePaper={false}
        rowSxSelector={({ expiresAt, charity }) => (expiresAt.isBefore() && !charity ? expiredCouponSx : {})}
      />
    </CampaignCard>
  );
};

export default CampaignCouponsCard;
