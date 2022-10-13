import { FieldArray } from 'formik';
import { Stack } from '@mui/system';
import { sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import { Typography } from '@mui/material';
import CampaignFormCharitySection from './CampaignFormCharitySection';
import Button from '../../generic/Button';
import { CampaignCharityBaseData } from '../../../types/campaignCharities';
import { CharityMinimalData } from '../../../types/charity';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';

interface Props {
  values: Partial<CampaignCharityBaseData>[];
}

const CampaignFormCharitiesSection = ({ values }: Props) => {
  const charities: CharityMinimalData[] = [
    { id: 1, name: 'A Heart of Gold' },
    { id: 2, name: 'Bob the Builder' },
    { id: 3, name: 'Charlie and the Chocolate Factory' },
    { id: 4, name: 'Donald Duck' },
    { id: 5, name: 'Elephant in the Room' },
  ];

  return (
    <FieldArray name="charities">
      {({ insert, remove }) => (
        <Stack sx={sectionSx} component="div" spacing={2}>
          <Typography variant="h3">Charities Info</Typography>

          {values?.map((charity, index) => (
            <CampaignFormCharitySection
              key={index}
              index={index}
              charities={charities}
              handleRemove={() => remove(index)}
            />
          ))}

          {values.length < MAX_NUM_OF_CAMPAIGN_CHARITIES ? (
            <Button actionType="tertiary" onClick={() => insert(values.length, {})}>
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

export default CampaignFormCharitiesSection;
