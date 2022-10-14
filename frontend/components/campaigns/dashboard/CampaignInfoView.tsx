import { Stack } from '@mui/system';
import React from 'react';
import { CampaignAdminData } from '../../../types/campaigns';
import CampaignInfoCard from './CampaignInfoCard';
import CampaignCharitiesCard from './CampaignCharitiesCard';
import CampaignPrimaryDonorCard from './CampaignPrimaryDonorCard';

interface Props {
  campaign: CampaignAdminData;
}

const CampaignInfoView = ({ campaign }: Props) => {
  return (
    <Stack sx={{ padding: '10%' }} component="div" spacing={4}>
      <CampaignInfoCard campaignBaseInfo={campaign} />

      <CampaignCharitiesCard campaignCharities={campaign.charities} />

      <CampaignPrimaryDonorCard primaryDonor={campaign.primaryDonor} />
    </Stack>
  );
};

export default CampaignInfoView;
