import React from 'react';
import { CampaignBaseData } from '../../../types/campaigns';
import { cardSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { formatDate } from '../../../utils/dates';

interface Props {
  campaignBaseInfo: CampaignBaseData;
}

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

const CampaignInfoItem = ({ title, children }: ItemProps) => (
  <>
    <Grid item xs={3}>
      <Typography variant="h4">{title}</Typography>
    </Grid>

    <Grid item xs={9}>
      {children}
    </Grid>
  </>
);

const CampaignInfoCard = ({ campaignBaseInfo }: Props) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    <Typography variant="h3">Campaign Info</Typography>

    <Grid container rowSpacing={2}>
      <CampaignInfoItem title="Name">{campaignBaseInfo.name}</CampaignInfoItem>

      <CampaignInfoItem title="Description">{campaignBaseInfo.description}</CampaignInfoItem>

      <CampaignInfoItem title="Promised Amount">${campaignBaseInfo.promisedAmount}</CampaignInfoItem>

      <CampaignInfoItem title="Coupon Denomination">${campaignBaseInfo.couponDenomination}</CampaignInfoItem>

      <CampaignInfoItem title="Start Date">{formatDate(campaignBaseInfo.start)}</CampaignInfoItem>

      <CampaignInfoItem title="End Date">{formatDate(campaignBaseInfo.end)}</CampaignInfoItem>
    </Grid>
  </Stack>
);

export default CampaignInfoCard;
