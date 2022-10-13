import { Box, Container } from '@mui/system';
import CampaignForm from '../../../components/campaigns/form/CampaignForm';
import Head from 'next/head';
import React from 'react';

const CampaignCreate = () => {
  return (
    <Box>
      <Head>
        <title>Create Campaign</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <CampaignForm />
      </Container>
    </Box>
  );
};

export default CampaignCreate;
