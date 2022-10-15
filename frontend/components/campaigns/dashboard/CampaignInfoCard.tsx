import React from 'react';
import { CampaignBaseData } from '../../../types/campaigns';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DATE_FORMAT } from '../../../utils/constants';
import {
  campaignInfoItemSx,
  campaignDateIconSx,
  campaignImageSx,
  campaignMoneyIconSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import moment, { Moment } from 'moment';
import PaidIcon from '@mui/icons-material/Paid';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

interface Props {
  campaignBaseInfo: CampaignBaseData;
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

const CampaignInfoCard = ({ campaignBaseInfo }: Props) => {
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
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item sm={12} md={6}>
          <Box sx={campaignImageSx} component="img" src={campaignBaseInfo.imageBase64} />
        </Grid>

        <Grid item sm={12} md={6}>
          <Stack component="div" spacing={2}>
            <Typography variant="h3">{campaignBaseInfo.name}</Typography>

            <Typography variant="body2">{campaignBaseInfo.description}</Typography>

            <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
              <Typography variant="h4">Status: {getStatus(campaignBaseInfo.start, campaignBaseInfo.end)}</Typography>

              <Stack component="div" direction="row" spacing={2}>
                <CampaignDateInfoIcon date={campaignBaseInfo.start} />

                <LinearScaleIcon fontSize="large" />

                <CampaignDateInfoIcon date={campaignBaseInfo.end} />
              </Stack>
            </Stack>

            <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
              <Typography variant="h4">Money Info</Typography>

              <Stack component="div" direction="row" spacing={2}>
                <CampaignMoneyInfoIcon
                  tooltipTitle="Promised Amount"
                  icon={<PaidIcon fontSize="large" />}
                  amount={campaignBaseInfo.promisedAmount}
                />

                <CampaignMoneyInfoIcon
                  tooltipTitle="Coupon Denomination"
                  icon={<LocalActivityIcon fontSize="large" />}
                  amount={campaignBaseInfo.couponDenomination}
                />
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignInfoCard;
