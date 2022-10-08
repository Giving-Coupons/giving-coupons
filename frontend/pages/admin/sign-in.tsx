import { NextPage } from 'next';
import { useState } from 'react';
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
import useAdminLoginCheck from '../../hooks/useAdminLogInCheck';
import { LockOpenOutlined } from '@mui/icons-material';
import { Alert, AlertTitle, List, ListItemText } from '@mui/material';

const adminApi = api.admin;

interface FormState {
  username?: string;
  password?: string;
}

const SignIn: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  useAdminLoginCheck();
  const [submitState, setSubmitState] = useState({ canSubmit: false, messages: [] as string[] });
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  });

  const createTextField = (field: keyof FormState, label: string) => (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name={field}
        label={label}
        type={field == 'password' ? 'password' : 'text'}
        id={field}
        onChange={handleChange(field)}
      />
    </Grid>
  );

  const createErrorMessages = (messages: string[]) => {
    return (
      messages &&
      messages.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <List>
            {messages.map((message, index) => (
              <ListItemText key={index}>{message}</ListItemText>
            ))}
          </List>
        </Alert>
      )
    );
  };

  const handleChange = (prop: keyof FormState) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...formState, [prop]: event.target.value };
    setFormState(newState);
    await adminLoginDataSchema
      .validate(newState, { abortEarly: false })
      .then(() => setSubmitState({ canSubmit: true, messages: [] }))
      .catch((err) => setSubmitState({ canSubmit: false, messages: err.errors }));
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
            {createTextField('username', 'Username')}
            {createTextField('password', 'Password')}
          </Grid>
          <Button type="submit" disabled={!submitState.canSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin/sign-up">{`Don't have an account? Sign up`}</Link>
            </Grid>
          </Grid>
          {!submitState.canSubmit && createErrorMessages(submitState.messages)}
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
