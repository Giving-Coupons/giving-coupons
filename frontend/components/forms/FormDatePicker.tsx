import { TextField, useMediaQuery } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Nullable } from '../../types/utils';
import moment, { Moment } from 'moment';
import { useTheme } from '@mui/system';
import React from 'react';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { useField } from 'formik';
import { DATE_FORMAT } from '../../utils/constants';

interface Props {
  name: string;
  label: string;
}

const FormDatePicker = ({ name, label }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [, { error, touched, value }, { setTouched, setValue }] = useField(name);

  const innerProps = {
    label,
    value,
    inputFormat: DATE_FORMAT,
    minDate: moment().add(1, 'day').startOf('day'),
    onChange: (value: Nullable<Moment>) => {
      const corrected = value === null ? value : value.startOf('day');
      // It is not explicitly stated in the docs / types, but it appears setFieldValue is an
      // async function. Resolving with promise and then setting touched ensures set touched
      // occurs after field value is set.
      Promise.resolve(setValue(corrected, true)).then(() => setTouched(true));
    },
    renderInput: (params: MuiTextFieldProps) => (
      <TextField
        {...params}
        error={touched && Boolean(error)}
        helperText={touched && error}
        label={label}
        onBlur={() => setTouched(true)}
        fullWidth
        required
      />
    ),
  };

  return isMobile ? <MobileDatePicker {...innerProps} /> : <DesktopDatePicker {...innerProps} />;
};

export default FormDatePicker;
