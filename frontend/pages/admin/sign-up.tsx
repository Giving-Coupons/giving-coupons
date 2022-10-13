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
import { AdminPostData } from '../../types/admin';
import { boxSx, h1Sx, mainSx, submitButtonSx } from '../../styles/admin/sign-up';

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
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (formState: AdminPostData) =>
    adminPostDataSchema
      .validate(formState)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => adminApi.registerNewAdmin(x) /* Interceptor will enqueue snackbar on success / error. */)
      .then((x) => {
        console.dir({ x, onSubmit: 'isResponse' });
        return x;
      })
      .catch((x) => {
        console.dir({ x, onSubmit: 'isError' });
        throw x;
      })
      .then(() => router.push('/admin/sign-in'))
      .catch(() => undefined);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      masterPassword: '',
    },
    validationSchema: adminPostDataSchema,
    onSubmit,
  });

  const propHelper = (name: keyof AdminPostData) => {
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
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth label="Username" type="text" {...propHelper('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Password" type="password" {...propHelper('password')} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Retype your password"
                type="password"
                {...propHelper('passwordConfirmation')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Master Password" type="password" {...propHelper('masterPassword')} />
            </Grid>
          </Grid>
          <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={submitButtonSx}>
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/admin/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
