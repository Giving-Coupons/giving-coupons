import { TextField } from '@mui/material';
import React from 'react';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { InterestFormData } from './InterestForm';
import { useField, useFormikContext } from 'formik';

interface TextInputProps {
  name: keyof InterestFormData;
  label: string;
  placeholder: string;
  numeric?: boolean | undefined;

  // include these props from MUI TextField.
  multiline?: MuiTextFieldProps['multiline'];
  InputProps?: MuiTextFieldProps['InputProps'];
  minRows?: MuiTextFieldProps['minRows'];
}

const InterestFormTextInput = ({
  name,
  label,
  placeholder,
  numeric,
  multiline,
  InputProps,
  minRows,
}: TextInputProps) => {
  const { values, setFieldValue } = useFormikContext<InterestFormData>();
  const [_field, { error, touched }, { setTouched }] = useField(name);

  const value = !numeric || isNaN(values[name] as number) ? values[name] : Number(values[name]).toString();

  const innerProps: MuiTextFieldProps = {
    value,
    id: name,
    name: name,
    type: 'text',
    required: true,
    fullWidth: true,
    onChange: (event) => {
      setTouched(true);
      setFieldValue(name, event.target.value, true);
    },
    error: touched && Boolean(error),
    helperText: touched && (error as string),
    // Ensures placeholder is always visible.
    InputLabelProps: { shrink: true },
    placeholder,
    label,

    multiline,
    InputProps,
    minRows,
  };
  return <TextField {...innerProps} />;
};
export default InterestFormTextInput;
