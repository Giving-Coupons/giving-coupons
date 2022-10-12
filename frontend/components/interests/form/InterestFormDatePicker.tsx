import { TextField, useMediaQuery } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Nullable } from '../../../types/utils';
import moment, { Moment } from 'moment';
import { useTheme } from '@mui/system';
import React from 'react';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { InterestFormData } from './InterestForm';

interface Props {
  name: keyof InterestFormData;
  value: Nullable<Moment>;
  label: string;
  touched?: boolean | undefined;
  errorMessage?: string;
  setTouched: (field: string, touched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const InterestFormDatePicker = ({ name, value, label, touched, errorMessage, setFieldValue, setTouched }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const innerProps = {
    value,
    label,
    inputFormat: 'DD/MM/yyyy',
    minDate: moment().add(1, 'day').startOf('day'),
    onClose: () => setTouched(name, true),
    onChange: (value: Moment | null) => {
      const corrected = value === null ? value : value.startOf('day');
      setTouched(name, true, false);
      setFieldValue(name, corrected, true);
    },
    renderInput: (params: MuiTextFieldProps) => (
      <TextField
        {...params}
        error={touched && Boolean(errorMessage)}
        helperText={touched && (errorMessage as string)}
        label={label}
        fullWidth
        required
      />
    ),
  };

  return isMobile ? <MobileDatePicker {...innerProps} /> : <DesktopDatePicker {...innerProps} />;
};

export default InterestFormDatePicker;
