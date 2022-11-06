import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { logoSx } from '../../styles/components/interests/InterestFormStyles';
import { SelectOptionData } from '../../types/utils';

interface Props<T> {
  name: string;
  label: string;
  placeholder?: string;
  multiple?: boolean;
  options: T[];
}

const FormAutocomplete = <T extends SelectOptionData>({
  name,
  label,
  placeholder,
  multiple = false,
  options,
}: Props<T>) => {
  const [, { value, error, touched }, { setValue, setTouched }] = useField(name);

  return (
    <Autocomplete
      fullWidth
      multiple={multiple}
      options={options}
      renderOption={(props, { name, logoUrl }) => (
        <li {...props}>
          <Stack direction="row" spacing={2} alignItems="center">
            {logoUrl && <Box component="img" src={logoUrl} sx={logoSx} />}
            <Typography>{name}</Typography>
          </Stack>
        </li>
      )}
      filterSelectedOptions
      value={
        Array.isArray(value)
          ? options.filter((option) => value.includes(option.id))
          : options.find((option) => option.id === value) ?? null
      }
      getOptionLabel={(option) => option.name}
      onChange={(_event, value) => {
        setTouched(true);
        setValue(Array.isArray(value) ? value.map((item) => item.id) : value?.id);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          placeholder={placeholder ?? ''}
          error={touched && Boolean(error)}
          helperText={touched && error}
          // Ensures placeholder is always visible.
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default FormAutocomplete;
