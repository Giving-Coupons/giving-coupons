import { Stack } from '@mui/system';
import { IconButton } from '@mui/material';
import {
  containerSx,
  fieldsContainerSx,
} from '../../../styles/components/campaigns/form/CampaignFormCharitySectionStyles';
import { CharityMinimalData } from '../../../types/charity';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormTextInput from '../../forms/FormTextInput';
import FormAutocomplete from '../../forms/FormAutocomplete';

interface Props {
  index: number;
  charities: CharityMinimalData[];
  handleRemove: (index: number) => void;
}

const CampaignFormCharitySection = ({ index, charities, handleRemove }: Props) => {
  const arrayFieldName = `charities[${index}]`;
  const givingSgUrlName = `${arrayFieldName}.givingSgUrl`;

  const charityOptions = charities.map((charity) => ({ ...charity, label: charity.name }));

  return (
    <Stack sx={containerSx} direction="row" component="div" spacing={1}>
      <Stack sx={fieldsContainerSx} component="div" spacing={1}>
        <FormAutocomplete
          name={`${arrayFieldName}.charity.id`}
          label="Find Charity"
          placeholder="Enter the charity name"
          options={charityOptions}
        />

        <FormTextInput
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
