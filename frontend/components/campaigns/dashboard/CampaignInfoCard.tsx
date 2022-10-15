import React from 'react';
import { CampaignBaseData } from '../../../types/campaigns';
import { Grid, Typography } from '@mui/material';
import { DATE_FORMAT } from '../../../utils/constants';
import CampaignCard from './CampaignCard';

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
  <CampaignCard>
    <Typography variant="h3">Campaign Info</Typography>

    <Grid container rowSpacing={2}>
      <CampaignInfoItem title="Name">{campaignBaseInfo.name}</CampaignInfoItem>

      <CampaignInfoItem title="Description">{campaignBaseInfo.description}</CampaignInfoItem>

      <CampaignInfoItem title="Promised Amount">${campaignBaseInfo.promisedAmount}</CampaignInfoItem>

      <CampaignInfoItem title="Coupon Denomination">${campaignBaseInfo.couponDenomination}</CampaignInfoItem>

      <CampaignInfoItem title="Start Date">{campaignBaseInfo.start.format(DATE_FORMAT)}</CampaignInfoItem>

      <CampaignInfoItem title="End Date">{campaignBaseInfo.end.format(DATE_FORMAT)}</CampaignInfoItem>
    </Grid>
  </CampaignCard>
);

export default CampaignInfoCard;
