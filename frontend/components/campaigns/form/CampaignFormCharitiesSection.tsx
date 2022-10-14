import { FieldArray } from 'formik';
import { Stack } from '@mui/system';
import { sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import { Typography } from '@mui/material';
import CampaignFormCharitySection from './CampaignFormCharitySection';
import Button from '../../generic/Button';
import { CampaignCharityBaseData } from '../../../types/campaignCharities';
import { CharityListData } from '../../../types/charity';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import useSWR from 'swr';
import CharitiesAPI from '../../../frontendApis/charities';
import api from '../../../frontendApis';

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

          {values?.map((charity, index) => (
            <CampaignFormCharitySection
              key={index}
              index={index}
              charityOptions={charityOptions ?? []}
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

export default CampaignFormCharitiesSection;
