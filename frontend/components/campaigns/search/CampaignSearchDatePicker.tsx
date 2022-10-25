import { TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { Moment } from 'moment';
import React from 'react';
import { Nullable } from '../../../types/utils';
import { DATE_FORMAT } from '../../../utils/constants';

interface Props {
  name: string;
  value: Nullable<Moment>;
  label: string;
  errorMessage: React.ReactNode;
  setFieldValue: (field: string, value: Nullable<Moment>, shouldValidate?: boolean | undefined) => void;
}

const CampaignSearchDatePicker = ({ name, value, label, errorMessage, setFieldValue }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const props = {
    inputFormat: DATE_FORMAT,
    onChange: (date: Nullable<Moment>) => setFieldValue(name, date),
    value,
    label,
    renderInput: (params: MuiTextFieldProps) => (
      <TextField name={name} {...params} error={!!errorMessage} helperText={errorMessage} variant="standard" />
    ),
  };

  return isMobile ? <MobileDatePicker {...props} /> : <DesktopDatePicker {...props} />;
};

export default CampaignSearchDatePicker;
