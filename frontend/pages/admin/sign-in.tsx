import { Stack } from '@mui/material';
import * as Yup from 'yup';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../../frontendApis';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { AdminLoginData } from '../../types/admin';
import { boxSx, h1Sx, mainSx, submitButtonSx } from '../../styles/admin/sign-in';
import FormTextInput from '../../components/forms/FormTextInput';
import Button from '../../components/generic/Button';

const adminLoginDataSchema = Yup.object({
  username: Yup.string().required('Username is a required field.'),
  password: Yup.string().required('Password is a required field.'),
});

const SignIn: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();

  const initialValues = { username: '', password: '' };
  const onSubmit = async (formState: AdminLoginData) =>
    api.admins
      // Interceptor will enqueue snackbar on success / error.
      .loginAdmin(formState)
      .then(() => router.push('/admin'))
      // Errors from API and schema have already been handled (user was notified). No further action needed.
      .catch(() => undefined);

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

        <Formik initialValues={initialValues} validationSchema={adminLoginDataSchema} onSubmit={onSubmit}>
          {({ dirty, isValid }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextInput name="username" label="Username" />
                </Grid>

                <Grid item xs={12}>
                  <FormTextInput name="password" label="Password" type="password" />
                </Grid>
              </Grid>

              <Button fullWidth type="submit" disabled={!isValid || !dirty} actionType="primary" sx={submitButtonSx}>
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/admin/sign-up">{`Don't have an account? Sign up`}</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignIn;
