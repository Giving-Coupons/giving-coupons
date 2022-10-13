import { Form, Formik } from 'formik';
import { Stack } from '@mui/system';
import { InputAdornment, Typography } from '@mui/material';
import { CampaignFormData } from '../../../types/campaigns';
import { containerSx, sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import Button from '../../generic/Button';
import FormikValuesListener from '../../forms/FormikValuesListener';
import CampaignFormCharitiesSection from './CampaignFormCharitiesSection';
import FormDatePicker from '../../forms/FormDatePicker';
import FormTextInput from '../../forms/FormTextInput';
import * as Yup from 'yup';
import { DEFAULT_COUPON_DENOMINATION, MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import moment from 'moment';
import { isValidDate } from '../../../utils/dates';

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

  const validationSchema = Yup.object().shape(
    {
      name: Yup.string().required('Campaign name is required.'),
      description: Yup.string().required('Campaign description is required.'),
      promisedAmount: Yup.number()
        .required('Promised amount is required.')
        .typeError('Promised amount must be a number.')
        .integer('Promised amount must be an integer.')
        .positive('Promised amount must be a positive.')
        .min(100, 'Promised amount must be at least $100')
        .test({
          test: (promisedAmount) => (promisedAmount ?? 0) % DEFAULT_COUPON_DENOMINATION === 0,
          message: `Promised amount must be a multiple of $${DEFAULT_COUPON_DENOMINATION}.`,
        }),
      start: Yup.date()
        .required('Start date is required.')
        .typeError('Start date must be a date.')
        .when('end', (endDate, schema) =>
          isValidDate(endDate) ? schema.max(endDate, 'Start date cannot be after End date') : schema,
        )
        .min(moment().endOf('day'), 'Start date cannot be today or in the past.'),
      end: Yup.date()
        .required('End date is required.')
        .typeError('End date must be a date.')
        .when('startDate', (startDate, schema) =>
          isValidDate(startDate) ? schema.min(startDate, 'End date cannot be before Start date') : schema,
        )
        .min(moment().endOf('day'), 'End date cannot be today or in the past.'),
      charities: Yup.array()
        .of(
          Yup.object().shape({
            charity: Yup.object().shape({
              id: Yup.number().required('Charity is required'),
            }),
            givingSgUrl: Yup.string()
              .required('Giving.sg campaign url is required')
              .url('A valid url including http:// or https:// is required'),
          }),
        )
        .min(1, 'At least one charity is required.')
        .max(
          MAX_NUM_OF_CAMPAIGN_CHARITIES,
          `There can only be a maximum of ${MAX_NUM_OF_CAMPAIGN_CHARITIES} charities.`,
        ),
      primaryDonor: Yup.object({
        name: Yup.string().required('Primary donor name is required.'),
        email: Yup.string()
          .required('Primary donor email is required.')
          .email('Donor email is not in the correct form.'),
      }),
    },
    [['start', 'end']],
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => undefined}>
      {({ values }) => (
        <Form>
          <FormikValuesListener handleChange={handleChange} />

          <Stack sx={containerSx} component="div" spacing={2}>
            <Typography variant="h1">Create Campaign</Typography>

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Campaign Info</Typography>

              <FormTextInput name="name" label="Name" placeholder="Enter the campaign name" />

              <FormTextInput
                name="description"
                label="Description"
                placeholder="Enter the campaign description"
                multiline
                minRows={2}
              />

              <FormTextInput
                name="promisedAmount"
                label="Promised Amount"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />

              <FormDatePicker name="start" label="Start Date" />

              <FormDatePicker name="end" label="End Date" />
            </Stack>

            <CampaignFormCharitiesSection values={values.charities} />

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Primary Donor Info</Typography>

              <FormTextInput name="primaryDonor.name" label="Name" placeholder="Enter the primary donor name" />

              <FormTextInput name="primaryDonor.email" label="Email" placeholder="Enter the primary donor email" />
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
