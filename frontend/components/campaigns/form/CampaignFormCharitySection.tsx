import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Stack } from '@mui/system';
import {
  containerSx,
  fieldsContainerSx,
} from '../../../styles/components/campaigns/form/CampaignFormCharitySectionStyles';
import { CharityListData } from '../../../types/charity';
import FormAutocomplete from '../../forms/FormAutocomplete';
import FormTextInput from '../../forms/FormTextInput';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';

interface Props {
  index: number;
  charityOptions: CharityListData[];
  handleRemove: () => void;
}

const CampaignFormCharitySection = ({ index, charityOptions, handleRemove }: Props) => {
  const arrayFieldName = `charities[${index}]`;

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
          name={`${arrayFieldName}.givingSgUrl`}
          label="GivingSg Url"
          placeholder="Enter the link to the Giving.sg campaign for this charity"
        />
      </Stack>

      <IconButtonWithTooltip
        icon={<RemoveCircleOutlineIcon />}
        tooltip="Remove Charity"
        color="error"
        onClick={handleRemove}
      />
    </Stack>
  );
};

export default CampaignFormCharitySection;
