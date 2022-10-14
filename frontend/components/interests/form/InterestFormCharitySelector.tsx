import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { CharityListData, CharityMinimalData } from '../../../types/charity';
import { InterestFormData } from './InterestForm';
import { Box, Stack, Typography } from '@mui/material';
import api from '../../../frontendApis';
import { useEffect, useState } from 'react';
import { logoSx } from '../../../styles/components/interests/InterestFormStyles';

interface Props {
  name: keyof InterestFormData;
  label: string;
  placeholder: string;
}

const InterestFormCharitySelector = ({ name, label, placeholder }: Props) => {
  const [, { error, touched }, { setValue, setTouched }] = useField<CharityMinimalData[]>(name);
  const [charities, setCharities] = useState<CharityListData[]>([]);
  useEffect(() => {
    api.charities
      .list()
      .then((res) => res.payload ?? [])
      .then(setCharities)
      .catch(() => undefined /* If there are any API errors, the interceptor will show it in the snackbar. */);
  }, []);

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={charities}
      renderOption={(props, { name, logoBase64 }) => (
        <li {...props}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box component="img" src={logoBase64} sx={logoSx} />
            <Typography>{name}</Typography>
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
