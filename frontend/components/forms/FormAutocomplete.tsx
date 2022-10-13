import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';
import { IdData } from '../../types/utils';

interface Props<T> {
  name: string;
  label: string;
  placeholder?: string;
  options: T[];
}

const FormAutocomplete = <T extends IdData>({ name, label, placeholder, options }: Props<T>) => {
  const [, { value, error, touched }, { setValue, setTouched }] = useField(name);

  return (
    <Autocomplete
      fullWidth
      options={options}
      value={options.find((option) => option.id === value) ?? null}
      onChange={(e, newValue) => {
        setTouched(true);
        setValue(newValue?.id);
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
