import { TextField } from '@mui/material';
import React from 'react';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { useField } from 'formik';

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;

  // include these props from MUI TextField.
  multiline?: MuiTextFieldProps['multiline'];
  InputProps?: MuiTextFieldProps['InputProps'];
  minRows?: MuiTextFieldProps['minRows'];
}

const InterestFormTextInput = ({ name, label, placeholder, multiline, InputProps, minRows }: TextInputProps) => {
  const [, { value, error, touched }, { setTouched, setValue }] = useField(name);

  const innerProps: MuiTextFieldProps = {
    id: name,
    name: name,
    type: 'text',
    required: true,
    fullWidth: true,
    value: value ?? '',
    onChange: (event) => {
      setTouched(true);
      setValue(event.target.value, true);
    },
    error: touched && Boolean(error),
    helperText: touched && error,
    // Ensures placeholder is always visible.
    InputLabelProps: { shrink: true },
    placeholder: placeholder ?? '',
    label,

    multiline,
    InputProps,
    minRows,
  };
  return <TextField {...innerProps} />;
};

export default InterestFormTextInput;
