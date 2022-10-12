import { TextField } from '@mui/material';
import React from 'react';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { InterestFormData } from './InterestForm';

interface Props {
  name: keyof InterestFormData;
  label: string;
  touched?: boolean | undefined;
  value: string | undefined;
  placeholder: string;
  errorMessage: string | undefined;
  setTouched: (field: string, touched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;

  // include these props from MUI TextField.
  multiline?: MuiTextFieldProps['multiline'];
  InputProps?: MuiTextFieldProps['InputProps'];
  minRows?: MuiTextFieldProps['minRows'];
}

const InterestFormTextInput = ({
  name,
  value,
  label,
  touched,
  errorMessage,
  placeholder,
  setTouched,
  setFieldValue,
  multiline,
  InputProps,
  minRows,
}: Props) => {
  const innerProps: MuiTextFieldProps = {
    id: name,
    name: name,
    type: 'text',
    required: true,
    fullWidth: true,
    value,
    onChange: (event) => {
      setTouched(name, true, false);
      setFieldValue(name, event.target.value, true);
    },
    error: touched && Boolean(errorMessage),
    helperText: touched && (errorMessage as string),
    // Ensures placeholder is always visible.
    InputLabelProps: { shrink: true },
    placeholder,
    label,
    multiline,
    InputProps,
    minRows,
  };
  console.dir({ name, touched, value, errorMessage });
  return <TextField {...innerProps} />;
};
export default InterestFormTextInput;
