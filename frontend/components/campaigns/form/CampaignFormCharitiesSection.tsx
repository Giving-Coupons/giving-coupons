import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FieldArray } from 'formik';
import useSWR from 'swr';
import api from '../../../frontendApis';
import CharitiesAPI from '../../../frontendApis/charities';
import { sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import { CampaignCharityBaseData } from '../../../types/campaignCharities';
import { CharityListData } from '../../../types/charity';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import Button from '../../generic/Button';
import CampaignFormCharitySection from './CampaignFormCharitySection';

interface Props {
  values: Partial<CampaignCharityBaseData>[];
}

const CampaignFormCharitiesSection = ({ values }: Props) => {
  const { data: charityOptions } = useSWR<CharityListData[]>(
    `${CharitiesAPI.CHARITIES_URL}/listCharityMinimalData`,
    () => api.charities.list().then((r) => r.payload ?? []),
  );

  return (
    <FieldArray name="charities">
      {({ insert, remove }) => (
        <Stack sx={sectionSx} component="div" spacing={2}>
          <Typography variant="h3">Charities Info</Typography>

          {values?.map((_charity, index) => (
            <CampaignFormCharitySection
              key={index}
              index={index}
              charityOptions={!charityOptions ? [] : removeSelectedCharitiesFromOptions(charityOptions, values, index)}
              handleRemove={() => remove(index)}
            />
          ))}

          {values.length < MAX_NUM_OF_CAMPAIGN_CHARITIES ? (
            <Button actionType="tertiary" startIcon={<AddIcon />} onClick={() => insert(values.length, {})}>
              Add Charity
            </Button>
          ) : (
            <Typography variant="caption" color="contrast.dark">
              Max number of charities added
            </Typography>
          )}
        </Stack>
      )}
    </FieldArray>
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

export default CampaignFormCharitiesSection;
