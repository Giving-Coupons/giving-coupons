import { Checkbox, FormControlLabel } from '@mui/material';

interface Props {
  name: string;
  checked: boolean;
  label: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const CampaignSearchCheckbox = ({ name, checked, label, setFieldValue }: Props) => {
  return (
    <FormControlLabel
      name={name}
      control={<Checkbox onChange={(e) => setFieldValue(name, e.target.checked)} />}
      label={label}
      checked={checked}
    />
  );
};

export default CampaignSearchCheckbox;
