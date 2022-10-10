import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Nullable } from '../../types/utils';
import { Moment } from 'moment';

interface Props {
  name: string;
  value: Nullable<Moment>;
  label: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const CampaignSearchDatePicker = ({ name, value, label, setFieldValue }: Props) => {
  return (
    <DesktopDatePicker
      onChange={(date) => setFieldValue(name, date)}
      value={value}
      label={label}
      renderInput={(params) => <TextField name={name} variant="standard" {...params} />}
    />
  );
};

export default CampaignSearchDatePicker;
