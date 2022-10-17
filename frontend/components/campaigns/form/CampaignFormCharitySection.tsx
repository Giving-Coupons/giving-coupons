import { Stack } from '@mui/system';
import {
  containerSx,
  fieldsContainerSx,
} from '../../../styles/components/campaigns/form/CampaignFormCharitySectionStyles';
import { CharityListData } from '../../../types/charity';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormTextInput from '../../forms/FormTextInput';
import FormAutocomplete from '../../forms/FormAutocomplete';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';
import { CampaignCharityBaseData } from '../../../types/campaignCharities';

interface Props {
  index: number;
  charityOptions: CharityListData[];
  selected: Partial<CampaignCharityBaseData>[];
  handleRemove: () => void;
}

const CampaignFormCharitySection = ({ index, charityOptions, selected, handleRemove }: Props) => {
  const arrayFieldName = `charities[${index}]`;

  return (
    <Stack sx={containerSx} direction="row" component="div" spacing={1}>
      <Stack sx={fieldsContainerSx} component="div" spacing={1}>
        <FormAutocomplete
          name={`${arrayFieldName}.charity.id`}
          label="Find Charity"
          placeholder="Enter the charity name"
          options={removeSelectedCharitiesFromOptions(charityOptions, selected, index)}
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

function removeSelectedCharitiesFromOptions(
  options: CharityListData[],
  selected: Partial<CampaignCharityBaseData>[],
  currentIndex: number,
) {
  const otherSelectedCharityIds = selected
    // Remove current CampaignFormCharitySection from inspection to protect value in current component.
    .map((value, selectedIndex) => (selectedIndex !== currentIndex ? value : undefined))
    .map((value) => value?.charity?.id)
    .filter((v) => v !== undefined);
  return options.filter((v) => !otherSelectedCharityIds.includes(v.id));
}

export default CampaignFormCharitySection;
