import { Stack } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { CampaignSearchFormData } from '../../../types/campaigns';
import FormikValuesListener from '../../forms/FormikValuesListener';
import CampaignSearchDatePicker from './CampaignSearchDatePicker';
import CampaignSearchCheckbox from './CampaignSearchCheckbox';
import { headerSx } from '../../../styles/components/campaigns/search/CampaignSearchFormStyles';
import * as Yup from 'yup';
import { isValidDate } from '../../../utils/dates';

interface Props {
  initialValues: CampaignSearchFormData;
  search: (values: CampaignSearchFormData) => void;
}

const CampaignSearchForm = ({ initialValues, search }: Props) => {
  const campaignSearchFormSchema = Yup.object().shape(
    {
      startDateFrom: Yup.date()
        .nullable()
        .when('startDateTo', (dateTo, schema) =>
          isValidDate(dateTo) ? schema.max(dateTo, 'From date cannot be after To date') : schema,
        ),
      startDateTo: Yup.date()
        .nullable()
        .when('startDateFrom', (dateFrom, schema) =>
          isValidDate(dateFrom) ? schema.min(dateFrom, 'To date cannot be before From date') : schema,
        )
        .when('endDateFrom', (endDate, schema) =>
          isValidDate(endDate) ? schema.max(endDate, 'Start date cannot be after End date') : schema,
        ),
      endDateFrom: Yup.date()
        .nullable()
        .when('endDateTo', (dateTo, schema) =>
          isValidDate(dateTo) ? schema.max(dateTo, 'From date cannot be after To date') : schema,
        )
        .when('startDateTo', (startDate, schema) =>
          isValidDate(startDate) ? schema.min(startDate, 'End date cannot be before Start date') : schema,
        ),
      endDateTo: Yup.date()
        .nullable()
        .when('endDateFrom', (dateFrom, schema) =>
          isValidDate(dateFrom) ? schema.min(dateFrom, 'To date cannot be before From date') : schema,
        ),
    },
    [
      ['startDateFrom', 'startDateTo'],
      ['endDateFrom', 'endDateTo'],
      ['startDateTo', 'endDateFrom'],
    ],
  );

  const handleChange = (values: CampaignSearchFormData) => {
    campaignSearchFormSchema
      .validate(values)
      .then(() => search(values))
      // Note: error must be caught, but no action is needed afterwards
      .catch(() => undefined);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={campaignSearchFormSchema} onSubmit={() => undefined}>
      {({ values, setFieldValue, errors }) => (
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
                name="startDateFrom"
                value={values.startDateFrom}
                label="From"
                errorMessage={errors?.startDateFrom}
                setFieldValue={setFieldValue}
              />

              <CampaignSearchDatePicker
                name="startDateTo"
                value={values.startDateTo}
                label="To"
                errorMessage={errors?.startDateTo}
                setFieldValue={setFieldValue}
              />
            </Stack>

            <Stack component="div">
              <Typography variant="h4">Campaign End date</Typography>

              <CampaignSearchDatePicker
                name="endDateFrom"
                value={values.endDateFrom}
                label="From"
                errorMessage={errors?.endDateFrom}
                setFieldValue={setFieldValue}
              />

              <CampaignSearchDatePicker
                name="endDateTo"
                value={values.endDateTo}
                label="To"
                errorMessage={errors?.endDateTo}
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
