import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { CharityListData, CharityMinimalData } from '../../../types/charity';
import { InterestFormData } from './InterestForm';
import { Stack } from '@mui/material';
import { campaignImageBase64 } from '../../../utils/examples';

interface Props {
  name: keyof InterestFormData;
  label: string;
  placeholder: string;
}

const InterestFormCharitySelector = ({ name, label, placeholder }: Props) => {
  const [, { error, touched }, { setValue, setTouched }] = useField<CharityMinimalData[]>(name);
  // TODO: These are placeholders and will be removed once the charity API is up.
  // Tracked in https://github.com/Giving-Coupons/giving-coupons/issues/132
  const charities: CharityListData[] = [1, 2, 3, 4, 5].flatMap((v) => [
    {
      id: 1 * v,
      name: 'Ark ' + v,
      logoBase64: campaignImageBase64,
    },
    {
      id: 2 * v,
      name: 'Bork ' + v,
      logoBase64: campaignImageBase64,
    },
  ]);

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={charities}
      renderOption={(props, { name, logoBase64 }) => (
        <li {...props}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img style={{ objectFit: 'contain' }} width={30} height={30} src={logoBase64} />
            <p>{name}</p>
          </Stack>
        </li>
      )}
      getOptionLabel={(option) => option.name}
      defaultValue={[]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={touched && Boolean(error)}
          helperText={touched && error}
          // Ensures placeholder is always visible.
          InputLabelProps={{ shrink: true }}
        />
      )}
      isOptionEqualToValue={(option: CharityListData, value: CharityListData) => option.id === value.id}
      onChange={(_event, value) => Promise.resolve(setValue(value, true)).then(() => setTouched(true))}
    />
  );
};

export default InterestFormCharitySelector;
