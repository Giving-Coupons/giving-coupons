import { Stack } from '@mui/system';
import React from 'react';
import { CampaignAdminData } from '../../../types/campaigns';
import CampaignInfoCard from './CampaignInfoCard';
import CampaignCharitiesCard from './CampaignCharitiesCard';
import CampaignPrimaryDonorCard from './CampaignPrimaryDonorCard';
import { sectionSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';

interface Props {
  campaign: CampaignAdminData;
}

const CampaignInfoView = ({ campaign }: Props) => {
  return (
    <Stack sx={sectionSx} component="div" spacing={4}>
      <CampaignInfoCard campaignBaseInfo={campaign} />

      <CampaignCharitiesCard campaignCharities={campaign.charities} />

      <CampaignPrimaryDonorCard primaryDonor={campaign.primaryDonor} />
    </Stack>
  );
};

export default CampaignInfoView;
