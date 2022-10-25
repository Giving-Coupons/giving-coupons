import { Stack } from '@mui/system';
import React from 'react';
import { cardSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';

interface Props {
  children: React.ReactNode;
}

const CampaignCard = ({ children }: Props) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    {children}
  </Stack>
);

export default CampaignCard;
