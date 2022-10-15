import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { Typography } from '@mui/material';
import Button from '../../../components/generic/Button';
import AddIcon from '@mui/icons-material/Add';
import { headerSx, rootSx } from '../../../styles/admin/charities/indexStyles';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';

const AdminCharities = () => {
  const router = useRouter();
  useAdminLoginCheck();

  return (
    <Box>
      <Head>
        <title>Manage Charities</title>
      </Head>

      <Box sx={rootSx} component="main">
        <Stack sx={headerSx} component="div" direction="row">
          <Typography variant="h1" gutterBottom>
            Charities
          </Typography>

          <Button actionType="primary" startIcon={<AddIcon />} onClick={() => router.push('/admin/charities/create')}>
            Create
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminCharities;
