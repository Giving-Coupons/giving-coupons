import { NextPage } from 'next';
import { useState } from 'react';
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
import { adminPostDataSchema } from '../../types/admin';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';

const adminApi = api.admins;

interface FormState {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
  masterPassword?: string;
}

const SignUp: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  useAdminLoginCheck();
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
    passwordConfirmation: '',
    masterPassword: '',
  });

  const createTextField = (field: keyof FormState, label: string) => (
    <TextField
      required
      fullWidth
      name={field}
      label={label}
      type={field.toLowerCase().includes('password') ? 'password' : 'text'}
      id={field}
      onChange={handleChange(field)}
    />
  );

  const handleChange = (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [prop]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    adminPostDataSchema
      .validate(formState)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => adminApi.registerNewAdmin(x) /* Interceptor will enqueue snackbar on success / error. */)
      .then(() => router.push('/admin/sign-in'))
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
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {createTextField('username', 'Username')}
            </Grid>
            <Grid item xs={12}>
              {createTextField('password', 'Password')}
            </Grid>
            <Grid item xs={12}>
              {createTextField('passwordConfirmation', 'Retype your password')}
            </Grid>
            <Grid item xs={12}>
              {createTextField('masterPassword', 'Master password')}
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={!adminPostDataSchema.isValidSync(formState)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
