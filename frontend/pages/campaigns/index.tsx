import CampaignListCard from '../../components/CampaignListCard';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { CampaignCharityData, CampaignListData } from '../../types/campaigns';

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
    <Container sx={{ width: '70%', paddingTop: '8px', paddingBottom: '8px' }}>
      <Grid container spacing={2}>
        {sampleCampaigns.map((campaign, index) => (
          <Grid item xs={4} sx={{ height: '480px' }} key={index}>
            <CampaignListCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Campaigns;
