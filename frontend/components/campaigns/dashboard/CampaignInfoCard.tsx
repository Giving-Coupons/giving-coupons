import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaidIcon from '@mui/icons-material/Paid';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Moment } from 'moment';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import api from '../../../frontendApis';
import {
  campaignDateIconSx,
  campaignImageSx,
  campaignInfoCardHeaderSx,
  campaignInfoItemSx,
  campaignMoneyIconSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignAdminData } from '../../../types/campaigns';
import { getCampaignStatus } from '../../../utils/campaigns';
import { DATE_FORMAT } from '../../../utils/constants';
import Button from '../../generic/Button';
import DeletionDialog from '../../generic/DeletionDialog';

interface Props {
  campaign: CampaignAdminData;
}

interface CampaignMoneyInfoProps {
  tooltipTitle: string;
  icon: React.ReactNode;
  amount: number;
}

interface CampaignDateInfoProps {
  date: Moment;
}

const CampaignMoneyInfoIcon = ({ tooltipTitle, icon, amount }: CampaignMoneyInfoProps) => (
  <Tooltip title={tooltipTitle}>
    <Stack sx={campaignMoneyIconSx} direction="row" component="div" spacing={1}>
      {icon}

      <Typography variant="h4">{amount}</Typography>
    </Stack>
  </Tooltip>
);

const CampaignDateInfoIcon = ({ date }: CampaignDateInfoProps) => (
  <Stack sx={campaignDateIconSx}>
    <CalendarTodayIcon fontSize="large" />

    <Typography>{date.format(DATE_FORMAT)}</Typography>
  </Stack>
);

const CampaignInfoCard = ({ campaign }: Props) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDelete = () => {
    api.campaigns.deleteCampaign(campaign.id).then(() => {
      setOpenDeleteDialog(false);
      router.push('/admin/campaigns');
    });
  };

  const numOfRedeemedCoupons = campaign.coupons.filter((coupon) => coupon.redemptionId != null).length;

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={campaignImageSx} component="img" src={campaign.imageBase64} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack component="div" spacing={2}>
          <Stack sx={campaignInfoCardHeaderSx} component="div" direction="row">
            <Typography variant="h3">{campaign.name}</Typography>

            <Stack component="div" direction="row" spacing={1}>
              <Button
                actionType="secondary"
                startIcon={<EditIcon />}
                onClick={() => router.push(`/admin/campaigns/${campaign.id}/edit`)}
              >
                Edit
              </Button>

              <Button actionType="danger" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteDialog(true)}>
                Delete
              </Button>
            </Stack>
          </Stack>

          <Typography variant="body2">{campaign.description}</Typography>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">Status: {getCampaignStatus(campaign.start, campaign.end)}</Typography>

            <Stack component="div" direction="row" spacing={2}>
              <CampaignDateInfoIcon date={campaign.start} />

              <LinearScaleIcon fontSize="large" />

              <CampaignDateInfoIcon date={campaign.end} />
            </Stack>
          </Stack>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">{`${campaign.coupons.length} coupons in total`}</Typography>

            <Typography variant="h5">{`${numOfRedeemedCoupons} of ${campaign.coupons.length} coupons redeemed`}</Typography>

            <Stack component="div" direction="row" spacing={2}>
              <CampaignMoneyInfoIcon
                tooltipTitle="Promised Amount"
                icon={<PaidIcon fontSize="large" />}
                amount={campaign.promisedAmount}
              />

              <CampaignMoneyInfoIcon
                tooltipTitle="Coupon Denomination"
                icon={<LocalActivityIcon fontSize="large" />}
                amount={campaign.couponDenomination}
              />
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      <DeletionDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        handleDelete={handleDelete}
        itemName={campaign.name}
        itemType="campaign"
      />
    </Grid>
  );
};

export default CampaignInfoCard;
