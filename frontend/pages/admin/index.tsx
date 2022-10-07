import { Box, Button, Container, CssBaseline } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { unsetAuthHeaders } from '../../frontendApis/helpers/authHeaders';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';

const AdminDashboard: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();

  const handleLogOut = () => {
    unsetAuthHeaders();
    router.push('/admin/sign-in');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>You are logged in!</p>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
