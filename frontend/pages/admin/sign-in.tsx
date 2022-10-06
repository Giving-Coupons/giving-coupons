import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import api from '../../frontendApis';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { adminLoginDataSchema } from '../../types/admin';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { isAuthHeaderSaved } from '../../frontendApis/helpers/authHeaders';
import { LockOpenOutlined } from '@mui/icons-material';

const adminApi = api.admin;

interface FormState {
  username?: string;
  password?: string;
}

const SignIn: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthHeaderSaved()) {
      router.push('/admin/sign-in');
    }
  });
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  });

  const createTextField = (field: keyof FormState, label: string) => (
    <TextField
      required
      fullWidth
      name={field}
      label={label}
      type={field == 'password' ? 'password' : 'text'}
      id={field}
      onChange={handleChange(field)}
    />
  );

  const handleChange = (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [prop]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    adminLoginDataSchema
      .validate(formState)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => adminApi.loginAdmin(x) /* Interceptor will enqueue snackbar on success / error. */)
      .then(() => router.push('/admin'))
      .catch(/* errors from validate and api have already been handled and can be ignored. */);
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
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {createTextField('username', 'Username')}
            </Grid>
            <Grid item xs={12}>
              {createTextField('password', 'Password')}
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={!adminLoginDataSchema.isValidSync(formState)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin/sign-up">Don't have an account? Sign up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
