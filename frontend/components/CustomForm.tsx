import * as Yup from 'yup';
import { ReactNode, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { Alert, AlertTitle, Button, CssBaseline, InputAdornment, List, ListItemText } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import { ApiPromise } from '../types/api';

interface SubmitState {
  canSubmit: boolean;
  messages: string[];
}

interface Props<T> {
  schema: Yup.SchemaOf<T>;
  submitFn: (arg: T) => ApiPromise<T>;
  renderFn: (args: FormRenderFunctionProps<T>) => ReactNode;
}

type FormDataKeys<T> = Extract<keyof T, string>;

type FormRenderFunctionProps<T> = {
  // Default component generators
  createDatePicker: (field: FormDataKeys<T>, label: string) => ReactNode;
  createTextField: (field: FormDataKeys<T>, label: string) => ReactNode;
  createMoneyField: (field: FormDataKeys<T>, label: string) => ReactNode;
  createSubmitButton: (label: string) => ReactNode;
  createErrorMessages: () => ReactNode;

  // If custom components are required, you may use these
  canSubmit: boolean;
  errorMessages: string[];
  currentValue: Partial<T>;
};

export default function CustomForm<T extends Record<string, string | number | DateTime>>({
  schema,
  submitFn,
  renderFn,
}: Props<T>): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [submitState, setSubmitState] = useState<SubmitState>({ canSubmit: false, messages: [] });
  const [formData, setFormData] = useState<Partial<T>>({});

  const createDatePicker = (field: FormDataKeys<T>, label: string) => (
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

  const createTextField = (field: FormDataKeys<T>, label: string) => (
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

  const createMoneyField = (field: FormDataKeys<T>, label: string) => (
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

  const createSubmitButton = (label: string) => (
    <Button type="submit" disabled={!submitState.canSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      {label}
    </Button>
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

  const handleDateChange = (prop: FormDataKeys<T>) => (value: DateTime | null) => {
    const newState = { ...formData, [prop]: value ?? undefined } as Partial<T>;
    setFormData(newState);
    schema
      .validate(newState, { abortEarly: false })
      .then(() => setSubmitState({ canSubmit: true, messages: [] }))
      .catch((err) => setSubmitState({ canSubmit: false, messages: err.errors }));
  };

  const handleTextChange = (prop: FormDataKeys<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...formData, [prop]: event.target.value } as Partial<T>;
    setFormData(newState);
    schema
      .validate(newState, { abortEarly: false })
      .then(() => setSubmitState({ canSubmit: true, messages: [] }))
      .catch((err) => setSubmitState({ canSubmit: false, messages: err.errors }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    schema
      .validate(formData)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then((x) => submitFn(x as T) /* Interceptor will enqueue snackbar on success / error. */)
      .catch(/* errors from validate and api have already been handled and can be ignored. */);
  };

  const renderProps: FormRenderFunctionProps<T> = {
    createDatePicker,
    createTextField,
    createMoneyField,
    createSubmitButton,
    createErrorMessages: () => createErrorMessages(submitState.messages),

    canSubmit: submitState.canSubmit,
    errorMessages: submitState.messages,
    currentValue: formData,
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {renderFn(renderProps)}
        {!submitState.canSubmit && createErrorMessages(submitState.messages)}
      </LocalizationProvider>
    </Box>
  );
}
