import { TextField, useMediaQuery } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Nullable } from '../../../types/utils';
import { Moment } from 'moment';
import { useTheme } from '@mui/system';
import React from 'react';
import { DATE_FORMAT } from '../../../utils/constants';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';

interface Props {
  name: string;
  value: Nullable<Moment>;
  label: string;
  errorMessage: React.ReactNode;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
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
