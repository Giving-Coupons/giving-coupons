import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaidIcon from '@mui/icons-material/Paid';
import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from '../../../frontendApis';
import {
  campaignImageSx,
  campaignInfoCardHeaderSx,
  campaignInfoItemSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignAdminData } from '../../../types/campaigns';
import { getCampaignStatus } from '../../../utils/campaigns';
import Button from '../../generic/Button';
import DeletionDialog from '../../generic/DeletionDialog';
import CampaignDateInfoIcon from './CampaignDateInfoIcon';
import CampaignMoneyInfoIcon from './CampaignMoneyInfoIcon';

interface Props {
  campaign: CampaignAdminData;
}

const CampaignInfoCard = ({ campaign }: Props) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDelete = () => {
    api.campaigns.deleteCampaign(campaign.id).then(() => {
      setOpenDeleteDialog(false);
      router.push('/admin/campaigns');
    });
  };

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={campaignImageSx} component="img" src={campaign.imageBase64} />
      </Grid>

      <Grid item xs={12} md={6} marginTop={1}>
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

            <Stack component="div" direction="row" spacing={2}>
              <CampaignMoneyInfoIcon
                tooltipTitle="Promised Amount"
                icon={<PaidIcon fontSize="large" />}
                text={`$${campaign.promisedAmount} in total`}
              />

              <CampaignMoneyInfoIcon
                tooltipTitle="Coupon Denomination"
                icon={<LocalActivityIcon fontSize="large" />}
                text={`$${campaign.couponDenomination} each`}
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
