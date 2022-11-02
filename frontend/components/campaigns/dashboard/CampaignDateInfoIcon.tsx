import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Moment } from 'moment';
import { campaignDateIconSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { DATE_FORMAT } from '../../../utils/constants';

interface CampaignDateInfoProps {
  label?: string;
  date: Moment;
}

const CampaignDateInfoIcon = ({ date, label }: CampaignDateInfoProps) => (
  <Stack sx={campaignDateIconSx}>
    <CalendarTodayIcon fontSize="large" />

    {label ?? <Typography>{label}</Typography>}

    <Typography>{date.format(DATE_FORMAT)}</Typography>
  </Stack>
);

export default CampaignDateInfoIcon;
