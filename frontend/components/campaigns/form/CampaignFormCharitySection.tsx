import { Stack } from '@mui/system';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import {
  containerSx,
  fieldsContainerSx,
} from '../../../styles/components/campaigns/form/CampaignFormCharitySectionStyles';
import { useField } from 'formik';
import { CharityMinimalData } from '../../../types/charity';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InterestFormTextInput from '../../interests/form/InterestFormTextInput';

interface Props {
  index: number;
  charities: CharityMinimalData[];
  handleRemove: (index: number) => void;
}

const CampaignFormCharitySection = ({ index, charities, handleRemove }: Props) => {
  const arrayFieldName = `charities[${index}]`;
  const idName = `${arrayFieldName}.charity.id`;
  const givingSgUrlName = `${arrayFieldName}.givingSgUrl`;

  const [, { value: idValue, error: idError, touched: idTouched }, { setValue: setIdValue, setTouched: setIdTouched }] =
    useField(idName);

  const charityOptions = charities.map((charity) => ({ ...charity, label: charity.name }));

  return (
    <Stack sx={containerSx} direction="row" component="div" spacing={1}>
      <Stack sx={fieldsContainerSx} component="div" spacing={1}>
        <Autocomplete
          fullWidth
          options={charityOptions}
          value={charityOptions.find((charity) => charity.id === idValue) ?? null}
          onChange={(e, newValue) => {
            setIdTouched(true);
            setIdValue(newValue?.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name={idName}
              label="Find Charity"
              placeholder="Enter the name of a charity"
              error={idTouched && Boolean(idError)}
              helperText={idTouched && idError}
              // Ensures placeholder is always visible.
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        <InterestFormTextInput
          name={givingSgUrlName}
          label="GivingSg Url"
          placeholder="Enter the link to the Giving.sg campaign for this charity"
        />
      </Stack>

      <IconButton color="error" onClick={() => handleRemove(index)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Stack>
  );
};

export default CampaignFormCharitySection;
