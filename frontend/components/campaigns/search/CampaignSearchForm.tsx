import { Stack } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { CampaignSearchFormData } from '../../../types/campaigns';
import FormikValuesListener from '../../forms/FormikValuesListener';
import CampaignSearchDatePicker from './CampaignSearchDatePicker';
import CampaignSearchCheckbox from '../CampaignSearchCheckbox';
import { headerSx } from '../../../styles/components/campaigns/search/CampaignSearchFormStyles';

interface Props {
  initialValues: CampaignSearchFormData;
  handleChange: (values: CampaignSearchFormData) => void;
}

const CampaignSearchForm = ({ initialValues, handleChange }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => undefined}>
      {({ values, setFieldValue }) => (
        <Form>
          <FormikValuesListener handleChange={handleChange} />

          <Stack component="div" spacing={2}>
            <Stack sx={headerSx} component="div" direction="row">
              <SearchIcon />

              <Typography variant="h4">Search</Typography>
            </Stack>

            <TextField
              name="name"
              label="Campaign name"
              variant="standard"
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
            />

            <Stack component="div">
              <Typography variant="h4">Status</Typography>

              <CampaignSearchCheckbox
                name="status.isActive"
                checked={values.status.isActive}
                label={'Active'}
                setFieldValue={setFieldValue}
              />

              <CampaignSearchCheckbox
                name="status.isUpcoming"
                checked={values.status.isUpcoming}
                label={'Upcoming'}
                setFieldValue={setFieldValue}
              />

              <CampaignSearchCheckbox
                name="status.isCompleted"
                checked={values.status.isCompleted}
                label={'Completed'}
                setFieldValue={setFieldValue}
              />
            </Stack>

            <Stack component="div">
              <Typography variant="h4">Campaign Start date</Typography>

              <CampaignSearchDatePicker
                name="startDate.from"
                value={values.startDate.from}
                label="From"
                setFieldValue={setFieldValue}
              />

              <CampaignSearchDatePicker
                name="startDate.to"
                value={values.startDate.to}
                label="To"
                setFieldValue={setFieldValue}
              />
            </Stack>

            <Stack component="div">
              <Typography variant="h4">Campaign End date</Typography>

              <CampaignSearchDatePicker
                name="endDate.from"
                value={values.endDate.from}
                label="From"
                setFieldValue={setFieldValue}
              />

              <CampaignSearchDatePicker
                name="endDate.to"
                value={values.endDate.to}
                label="To"
                setFieldValue={setFieldValue}
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CampaignSearchForm;
