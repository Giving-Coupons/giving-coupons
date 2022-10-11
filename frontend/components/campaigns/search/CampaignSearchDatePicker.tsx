import { TextField, useMediaQuery } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Nullable } from '../../../types/utils';
import { Moment } from 'moment';
import { useTheme } from '@mui/system';
import React from 'react';

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

  return isMobile ? (
    <MobileDatePicker
      onChange={(date) => setFieldValue(name, date)}
      value={value}
      label={label}
      renderInput={(params) => (
        <TextField name={name} {...params} error={!!errorMessage} helperText={errorMessage} variant="standard" />
      )}
    />
  ) : (
    <DesktopDatePicker
      onChange={(date) => setFieldValue(name, date)}
      value={value}
      label={label}
      renderInput={(params) => (
        <TextField name={name} {...params} error={!!errorMessage} helperText={errorMessage} variant="standard" />
      )}
    />
  );
};

export default CampaignSearchDatePicker;
