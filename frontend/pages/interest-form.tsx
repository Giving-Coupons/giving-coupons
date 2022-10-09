import { NextPage } from 'next';
import { useState } from 'react';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { LockOpenOutlined } from '@mui/icons-material';
import { Alert, AlertTitle, InputAdornment, List, ListItemText } from '@mui/material';
import { Interest, interestSchema } from '../types/interest';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { WithoutId } from '../types/utils';

const interestsApi = api.interests;
const InterestFormPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [submitState, setSubmitState] = useState({ canSubmit: false, messages: [] as string[] });
  const [formData, setFormData] = useState<Partial<WithoutId<Interest>>>();

  const createDatePicker = (field: keyof WithoutId<Interest>, label: string) => (
    <Grid item xs={12}>
      <MobileDatePicker
        inputFormat="EEE, dd MMM yyyy"
        value={formData ? formData[field] ?? null : null}
        toolbarTitle={label}
        onChange={handleDateChange(field)}
        renderInput={(props) => <TextField {...{ ...props, label }} />}
      ></MobileDatePicker>
    </Grid>
  );

  const createTextField = (field: keyof Interest, label: string) => (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name={field}
        label={label}
        type="text"
        id={field}
        onChange={handleTextChange(field)}
      />
    </Grid>
  );

  const createMoneyField = (field: keyof Interest, label: string) => (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name={field}
        label={label}
        type="text"
        id={field}
        onChange={handleTextChange(field)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
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

  const handleDateChange = (prop: keyof Interest) => (value: Date | null) => {
    const newState = { ...formData, [prop]: value ?? undefined };
    setFormData(newState);
    interestSchema
      .validate(newState, { abortEarly: false })
      .then(() => setSubmitState({ canSubmit: true, messages: [] }))
      .catch((err) => setSubmitState({ canSubmit: false, messages: err.errors }));
  };

  const handleTextChange = (prop: keyof Interest) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...formData, [prop]: event.target.value };
    setFormData(newState);
    interestSchema
      .validate(newState, { abortEarly: false })
      .then(() => setSubmitState({ canSubmit: true, messages: [] }))
      .catch((err) => setSubmitState({ canSubmit: false, messages: err.errors }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interestSchema
      .validate(formData)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => interestsApi.addInterest(x) /* Interceptor will enqueue snackbar on success / error. */)
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
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Grid container spacing={2}>
              {createTextField('donorName', 'Name')}
              {createTextField('donorEmail', 'Email')}
              {createTextField('campaignName', 'Campaign name')}
              {createTextField('campaignDescription', 'Campaign description')}
              {createTextField('charities', 'Charities')}
              {createMoneyField('promisedAmount', 'Promised Amount')}
              {createMoneyField('couponDenomination', 'Coupon Denomination')}
              {createDatePicker('start', 'Start Date')}
              {createDatePicker('end', 'End Date')}
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
          </LocalizationProvider>
        </Box>
      </Box>
    </Container>
  );
};

export default InterestFormPage;
