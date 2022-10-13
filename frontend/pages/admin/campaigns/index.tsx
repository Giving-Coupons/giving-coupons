import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { Typography } from '@mui/material';
import React from 'react';
import { headerSx, rootSx } from '../../../styles/admin/campaigns/indexStyles';
import Button from '../../../components/generic/Button';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

const AdminCampaigns = () => {
  useAdminLoginCheck();
  const router = useRouter();

  return (
    <Box>
      <Head>
        <title>Manage Campaigns</title>
      </Head>

      <Box sx={rootSx} component="main">
        <Stack sx={headerSx} component="div" direction="row">
          <Typography variant="h1" gutterBottom>
            Campaigns
          </Typography>

          <Button actionType="primary" startIcon={<AddIcon />} onClick={() => router.push('/admin/campaigns/create')}>
            Create
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminCampaigns;
