import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import api from '../../frontendApis';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { AdminLoginData, adminLoginDataSchema } from '../../types/admin';

const adminApi = api.admins;

const SignIn: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (formState: AdminLoginData) =>
    adminLoginDataSchema
      .validate(formState)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => adminApi.loginAdmin(x) /* Interceptor will enqueue snackbar on success / error. */)
      .then(() => router.push('/admin'))
      .catch(/* errors from validate and api have already been handled and can be ignored. */);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: adminLoginDataSchema,
    onSubmit,
  });

  const propHelper = (name: keyof AdminLoginData) => {
    return {
      id: name,
      name: name,
      value: formik.values[name],
      onChange: formik.handleChange,
      error: formik.touched[name] && Boolean(formik.errors[name]),
      helperText: formik.touched[name] && formik.errors[name],
      onBlur: formik.handleBlur,
    };
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack component="div" direction="row" spacing={0.5}>
          <Typography variant={'h3'}>Giving Coupons</Typography>

          <Typography variant="caption" color="primary">
            Admin
          </Typography>
        </Stack>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth label="Username" type="text" {...propHelper('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Password" type="password" {...propHelper('password')} />
            </Grid>
          </Grid>
          <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/admin/sign-up">{`Don't have an account? Sign up`}</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
