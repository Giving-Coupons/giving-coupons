import { cardSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Stack } from '@mui/system';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CampaignCard = ({ children }: Props) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    {children}
  </Stack>
);

export default CampaignCard;
