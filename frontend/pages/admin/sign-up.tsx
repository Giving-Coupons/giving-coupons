import { NextPage } from 'next';
import api from '../../frontendApis';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { AdminPostData, adminPostDataSchema } from '../../types/admin';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { useFormik } from 'formik';

const adminApi = api.admins;

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
      .then(() => router.push('/admin/sign-in'))
      .catch(/* errors from validate and api have already been handled and can be ignored. */);

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
          <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
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
