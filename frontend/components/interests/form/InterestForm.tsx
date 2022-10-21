import * as Yup from 'yup';
import Container from '@mui/material/Container';
import { InterestData } from '../../../types/interest';
import { Button, InputAdornment, Stack, Typography } from '@mui/material';
import { submitButtonSx } from '../../../styles/components/interests/InterestFormStyles';
import { Form, Formik } from 'formik';
import moment, { Moment } from 'moment';
import { DEFAULT_COUPON_DENOMINATION, MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import FormDatePicker from '../../forms/FormDatePicker';
import { Nullable } from '../../../types/utils';
import FormTextInput from '../../forms/FormTextInput';
import InterestFormAmountButton from './InterestFormAmountButton';
import InterestFormCharitySelector from './InterestFormCharitySelector';
import FormImageUpload from '../../forms/FormImageUpload';

export type InterestFormData = Partial<
  Omit<InterestData, 'id' | 'status' | 'couponDenomination' | 'start' | 'end' | 'charities'>
> & {
  start: Nullable<Moment>;
  charityIds: number[];
  lengthOfCampaign?: number;
};

export const interestFormSchema = Yup.object({
  donorName: Yup.string().required('Donor name is required.'),
  donorEmail: Yup.string().required('Donor email is required.').email('Donor email is not in the correct form.'),
  donorImageBase64: Yup.string().required('Avatar is required.'),
  campaignName: Yup.string().required('Campaign name is required.'),
  campaignDescription: Yup.string().required('Campaign description is required.'),
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
  campaignImageBase64: Yup.string().required('Campaign image is required.'),
  start: Yup.date()
    .required('Start date is required.')
    .typeError('Start date must be a date.')
    .min(moment().endOf('day'), 'Start date cannot be today or in the past.'),
  lengthOfCampaign: Yup.number()
    .required('Length of campaign must be a positive integer.')
    .typeError('Length of campaign must be a number.')
    .integer('Length of campaign must be an integer.')
    .positive('Length of campaign must be positive')
    .max(31, 'Length of campaign cannot be longer than a month'),
  charityIds: Yup.array(Yup.number().required())
    .min(1, 'At least 1 charity must be selected.')
    .max(MAX_NUM_OF_CAMPAIGN_CHARITIES, `At most ${MAX_NUM_OF_CAMPAIGN_CHARITIES} charities can be selected.`)
    .required('Charity selection is required.'),
});

export type InterestFormSubmitHandler = (formState: Yup.InferType<typeof interestFormSchema>) => Promise<unknown>;
export interface InterestFormProps {
  onSubmit: InterestFormSubmitHandler;
}

export default function InterestForm({ onSubmit }: InterestFormProps) {
  const initialValues: InterestFormData = { start: null, charityIds: [] };

  return (
    <Container maxWidth="lg">
      <Stack spacing={1} marginBottom={2}>
        <Typography component="h1" align="center" variant="h2">
          Interested in starting a campaign?
        </Typography>
        <Typography variant="subtitle1" align="center">
          Fill up the form below and we will get back to you!
        </Typography>
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={interestFormSchema}
        onSubmit={async (values: InterestFormData) => interestFormSchema.validate(values).then(onSubmit)}
      >
        {({ isValid, dirty }) => (
          <Form>
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography component="h2" variant="h3">
                  Your Campaign
                </Typography>

                <InterestFormCharitySelector
                  name="charityIds"
                  label="Charities supported"
                  placeholder="Choose your campaign beneficiaries."
                />

                <FormTextInput
                  name="campaignName"
                  label="Campaign Name"
                  placeholder="Give your campaign a name."
                  disableAutocomplete
                />

                <FormTextInput
                  name="campaignDescription"
                  label="Description"
                  placeholder="What inspired you to start this campaign?"
                  multiline
                  minRows={2}
                />

                <FormDatePicker name="start" label={'Start Date'} />

                <FormTextInput
                  name="lengthOfCampaign"
                  label="Length of Campaign"
                  InputProps={{ endAdornment: <InputAdornment position="end">day(s)</InputAdornment> }}
                />

                <FormImageUpload name="campaignImageBase64" label="Upload Campaign Image" />
              </Stack>
              <Stack spacing={2}>
                <Stack spacing={0}>
                  <Typography component="h2" variant="h3">
                    Your contribution
                  </Typography>

                  <Typography variant="body1">
                    All of your money will be converted to $10 coupons for distribution.
                  </Typography>
                </Stack>

                <FormTextInput
                  name="promisedAmount"
                  label="Promised Amount"
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />

                <Stack spacing={1}>
                  <Typography variant="body2">Or choose an amount below:</Typography>

                  <Stack direction="row" spacing={2}>
                    {[500, 1000, 2500, 5000].map((value) => (
                      <InterestFormAmountButton name="promisedAmount" value={value} key={value} />
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography component="h2" variant="h3">
                  Your Details
                </Typography>

                <FormTextInput name="donorName" label="Name" />

                <FormTextInput name="donorEmail" label="Email" />

                <FormImageUpload name="donorImageBase64" label="Upload Avatar" />
              </Stack>
            </Stack>

            <Button type="submit" disabled={!isValid || !dirty} fullWidth variant="contained" sx={submitButtonSx}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
