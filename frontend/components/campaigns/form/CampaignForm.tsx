import { Form, Formik } from 'formik';
import { Stack } from '@mui/system';
import { InputAdornment, Typography } from '@mui/material';
import { CampaignFormData } from '../../../types/campaigns';
import { containerSx, sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import Button from '../../generic/Button';
import FormikValuesListener from '../../forms/FormikValuesListener';
import CampaignFormCharitiesSection from './CampaignFormCharitiesSection';
import InterestFormDatePicker from '../../interests/form/InterestFormDatePicker';
import InterestFormTextInput from '../../interests/form/InterestFormTextInput';

const CampaignForm = () => {
  const initialValues: CampaignFormData = {
    start: null,
    end: null,
    interestId: null,
    charities: [{}],
  };

  const handleChange = (values: CampaignFormData) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => undefined}>
      {({ values }) => (
        <Form>
          <FormikValuesListener handleChange={handleChange} />

          <Stack sx={containerSx} component="div" spacing={2}>
            <Typography variant="h1">Create Campaign</Typography>

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Campaign Info</Typography>

              <InterestFormTextInput name="name" label="Name" placeholder="Enter the campaign name" />

              <InterestFormTextInput
                name="description"
                label="Description"
                placeholder="Enter the campaign description"
              />

              <InterestFormTextInput
                name="promisedAmount"
                label="Promised Amount"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />

              <InterestFormDatePicker name="start" label="Start Date" />

              <InterestFormDatePicker name="end" label="End Date" />
            </Stack>

            <CampaignFormCharitiesSection values={values.charities} />

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Primary Donor Info</Typography>

              <InterestFormTextInput
                name="primaryDonor.name"
                label="Name"
                placeholder="Enter the primary donor's name"
              />

              <InterestFormTextInput
                name="primaryDonor.email"
                label="Email"
                placeholder="Enter the primary donor's email"
              />
            </Stack>

            <Button actionType="primary" fullWidth>
              Create
            </Button>

            <Button actionType="muted" fullWidth>
              Cancel
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CampaignForm;
