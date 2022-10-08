import { Box } from '@mui/system';
import { CampaignCharityData, CampaignListData } from '../../types/campaigns';
import Head from 'next/head';
import CampaignList from '../../components/CampaignList';

const sampleCharity: CampaignCharityData = {
  id: 1,
  name: 'Beyond Social Services',
  logoUrl: '/sample-beneficiary-logo.png',
};

const sampleCampaign: CampaignListData = {
  id: 1,
  name: 'Campaign Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet accumsan dolor. Sed fermentum ex\n' +
    '            neque, sit amet dapibus ante rutrum non.',
  imageUrl: '/sample.png',
  charities: Array(4).fill(sampleCharity),
  donations: {
    primaryDonor: {
      amount: 60,
      fraction: 0.6,
    },
    secondaryDonors: {
      amount: 40,
      fraction: 0.4,
    },
  },
};

const sampleCampaigns: CampaignListData[] = Array(11).fill(sampleCampaign);

const Campaigns = () => {
  return (
    <Box>
      <Head>
        <title>Campaigns</title>
      </Head>

      <CampaignList campaigns={sampleCampaigns} />
    </Box>
  );
};

export default Campaigns;
