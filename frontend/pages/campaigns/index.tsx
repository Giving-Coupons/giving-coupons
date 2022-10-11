import { Box, Container, useTheme } from '@mui/system';
import { CampaignCharityData, CampaignListData } from '../../types/campaigns';
import Head from 'next/head';
import CampaignList from '../../components/campaigns/CampaignList';
import { Fab, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import CampaignSearch from '../../components/campaigns/search/CampaignSearch';
import { containerSx, mobileSearchButtonSx } from '../../styles/pages/campaigns/indexStyles';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchDrawerIsOpen, setSearchDrawerIsOpen] = useState<boolean>(false);

  return (
    <Box>
      <Head>
        <title>Campaigns</title>
      </Head>

      <Container sx={containerSx} component="main">
        <CampaignSearch searchDrawerIsOpen={searchDrawerIsOpen} setSearchDrawerIsOpen={setSearchDrawerIsOpen} />

        <CampaignList campaigns={sampleCampaigns} />

        {isMobile && (
          <Fab sx={mobileSearchButtonSx} onClick={() => setSearchDrawerIsOpen(true)}>
            <SearchIcon fontSize="large" />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default Campaigns;
