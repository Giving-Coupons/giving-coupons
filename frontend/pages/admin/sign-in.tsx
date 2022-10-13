import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
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
import { AdminLoginData } from '../../types/admin';
import { boxSx, h1Sx, mainSx, submitButtonSx } from '../../styles/admin/sign-in';

const adminApi = api.admins;

const adminLoginDataSchema = Yup.object({
  username: Yup.string().required('Username is a required field.'),
  password: Yup.string().required('Password is a required field.'),
});

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
      .catch(() => undefined);

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
    <Container component="main" maxWidth="xs" sx={mainSx}>
      <Box sx={boxSx}>
        <Stack component="div" direction="row" spacing={0.5}>
          <Typography variant={'h3'}>Giving Coupons</Typography>

          <Typography variant="caption" color="primary">
            Admin
          </Typography>
        </Stack>
        <Typography component="h1" variant="h4" sx={h1Sx}>
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
          <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={submitButtonSx}>
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
