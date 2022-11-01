import { Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { campaignMoneyIconSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';

interface CampaignMoneyInfoProps {
  tooltipTitle: string;
  icon: React.ReactNode;
  amount: number;
}

const CampaignMoneyInfoIcon = ({ tooltipTitle, icon, amount }: CampaignMoneyInfoProps) => (
  <Tooltip title={tooltipTitle}>
    <Stack sx={campaignMoneyIconSx} direction="row" component="div" spacing={1}>
      {icon}

      <Typography variant="h4">{amount}</Typography>
    </Stack>
  </Tooltip>
);

export default CampaignMoneyInfoIcon;
