import * as Yup from 'yup';
import { ReactNode, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, Button, InputAdornment, List, ListItemText } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ApiPromise } from '../types/api';

interface SubmitState {
  canSubmit: boolean;
  messages: string[];
}

export interface CustomFormProps<T> {
  initialData?: Partial<T>;
  schema: Yup.AnyObjectSchema;
  submitFn: (arg: T) => ApiPromise<unknown>;
  renderFn: (args: FormRenderFunctionProps<T>) => ReactNode;
}

type FormDataKeys<T> = Extract<keyof T, string>;

export type FormRenderFunctionProps<T> = {
  // Default component generators
  createDatePicker: (field: FormDataKeys<T>, label: string) => ReactNode;
  createTextField: (field: FormDataKeys<T>, label: string) => ReactNode;
  createMoneyField: (field: FormDataKeys<T>, label: string) => ReactNode;
  createSubmitButton: (label: string) => ReactNode;
  createErrorMessages: () => ReactNode;

  // If custom components are required, you may use these
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: FormDataKeys<T>, value: any) => void;
  canSubmit: boolean;
  errorMessages: string[];
  currentValue: Partial<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCustomForm<T extends Record<string, any>>({
  initialData,
  schema,
  submitFn,
  renderFn,
}: CustomFormProps<T>): JSX.Element {
  const [submitState, setSubmitState] = useState<SubmitState>({ canSubmit: false, messages: [] });
  const [formData, setFormData] = useState<Partial<T>>(initialData ?? {});

  const createDatePicker = (field: FormDataKeys<T>, label: string) => (
    <Grid item xs={12}>
      <MobileDatePicker
        inputFormat="ddd, D MMM yyyy"
        value={formData ? formData[field] ?? null : null}
        toolbarTitle={label}
        onChange={(value) => handleChange(field, value)}
        renderInput={(props) => <TextField {...{ ...props, label, fullWidth: true, required: true }} />}
      />
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
        onChange={(event) => handleChange(field, event.target.value)}
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
        onChange={(event) => handleChange(field, event.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Grid>
  );

  const createSubmitButton = (label: string) => (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (prop: FormDataKeys<T>, value: any) => {
    const newState = { ...formData, [prop]: value ?? undefined } as Partial<T>;
    setFormData(newState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validatedData: T;
    try {
      validatedData = await schema.validate(formData, { abortEarly: false });
    } catch (error) {
      setSubmitState({ canSubmit: false, messages: (error as { errors: string[] }).errors }); // Set error messages.
      return;
    }

    setSubmitState({ canSubmit: true, messages: [] }); // Clear form error messages.
    await submitFn(validatedData); // Interceptor will enqueue snackbar on API success / error.
  };

  const renderProps: FormRenderFunctionProps<T> = {
    createDatePicker,
    createTextField,
    createMoneyField,
    createSubmitButton,
    createErrorMessages: () => !submitState.canSubmit && createErrorMessages(submitState.messages),

    handleChange,
    canSubmit: submitState.canSubmit,
    errorMessages: submitState.messages,
    currentValue: formData,
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>{renderFn(renderProps)}</LocalizationProvider>
    </Box>
  );
}
