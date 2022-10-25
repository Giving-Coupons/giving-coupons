import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import FormTextInput from '../../components/forms/FormTextInput';
import Button from '../../components/generic/Button';
import api from '../../frontendApis';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { boxSx, h1Sx, mainSx, submitButtonSx } from '../../styles/admin/sign-up';
import { AdminPostData } from '../../types/admin';

const adminApi = api.admins;

const adminPostDataSchema = Yup.object({
  username: Yup.string().required('Username is a required field.'),
  password: Yup.string()
    .required('Password is a required field.')
    .min(6, `The new user's password must be at least 6 characters long.`),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is a required field.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  masterPassword: Yup.string().required('Master password is a required field.'),
});

const SignUp: NextPage = () => {
  useAdminLoginCheck();
  const router = useRouter();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
    masterPassword: '',
  };
  const onSubmit = async (formState: AdminPostData) =>
    adminApi
      // Interceptor will enqueue snackbar on success / error.
      .registerNewAdmin(formState)
      .then(() => router.push('/admin/sign-in'))
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
          Sign up
        </Typography>

        <Formik initialValues={initialValues} validationSchema={adminPostDataSchema} onSubmit={onSubmit}>
          {({ dirty, isValid }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextInput name="username" label="Username" />
                </Grid>

                <Grid item xs={12}>
                  <FormTextInput name="password" label="Password" type="password" />
                </Grid>

                <Grid item xs={12}>
                  <FormTextInput name="passwordConfirmation" label="Retype your password" type="password" />
                </Grid>

                <Grid item xs={12}>
                  <FormTextInput name="masterPassword" label="Master password" type="password" />
                </Grid>
              </Grid>

              <Button fullWidth type="submit" disabled={!isValid || !dirty} actionType="primary" sx={submitButtonSx}>
                Sign Up
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/admin/sign-in">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
