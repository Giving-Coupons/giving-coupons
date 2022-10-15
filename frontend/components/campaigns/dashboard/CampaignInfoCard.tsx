import React from 'react';
import { CampaignAdminData } from '../../../types/campaigns';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DATE_FORMAT } from '../../../utils/constants';
import {
  campaignInfoItemSx,
  campaignDateIconSx,
  campaignImageSx,
  campaignMoneyIconSx,
  campaignInfoCardHeaderSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import moment, { Moment } from 'moment';
import PaidIcon from '@mui/icons-material/Paid';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Button from '../../generic/Button';
import { useRouter } from 'next/router';

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
  const getStatus = (start: Moment, end: Moment) => {
    if (end.isBefore(moment().startOf('day'))) {
      return 'Completed';
    }

    if (start.isAfter(moment().endOf('day'))) {
      return 'Upcoming';
    }

    return 'Active';
  };

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
              <Button actionType="secondary" onClick={() => router.push(`/admin/campaigns/${campaign.id}/edit`)}>
                Edit
              </Button>

              <Button actionType="danger">Delete</Button>
            </Stack>
          </Stack>

          <Typography variant="body2">{campaign.description}</Typography>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">Status: {getStatus(campaign.start, campaign.end)}</Typography>

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
    </Grid>
  );
};

export default CampaignInfoCard;
