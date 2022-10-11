import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Interest } from '../../../types/interest';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, Stack, Typography } from '@mui/material';
import { amountButtonSx, submitButtonSx } from '../../../styles/interest';
import { Form, Formik, useFormik } from 'formik';
import moment, { Moment } from 'moment';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';
import { DEFAULT_COUPON_DENOMINATION } from '../../../utils/constants';

export type InterestFormData = Partial<
  Omit<Interest, 'id' | 'charities' | 'status' | 'couponDenomination' | 'start' | 'end'>
> & {
  start: Moment | null;
  lengthOfCampaign?: number;
};

export const interestFormSchema = Yup.object({
  donorName: Yup.string().required('Donor name is required.'),
  donorEmail: Yup.string().required('Donor email is required.').email('Donor email is not in the correct form.'),
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
  // TODO: charities are not covered in this PR as the model is TBD.
  // charities: Yup.array(charitySchema).required(),
});

export type InterestFormSubmitHandler = (formState: Yup.InferType<typeof interestFormSchema>) => Promise<unknown>;
export interface InterestFormProps {
  onSubmit: InterestFormSubmitHandler;
}

export default function InterestForm({ onSubmit }: InterestFormProps) {
  const initialValues: InterestFormData = { start: null };
  const formik = useFormik({
    initialValues,
    validationSchema: interestFormSchema,
    onSubmit: (x) => interestFormSchema.validate(x).then(onSubmit),
  });

  const textInputPropHelper = (name: keyof InterestFormData, label: string, placeholder: string) => {
    return {
      id: name,
      name: name,
      type: 'text',
      required: true,
      fullWidth: true,
      value: formik.values[name],
      onBlur: formik.handleBlur,
      onChange: formik.handleChange,
      error: formik.touched[name] && Boolean(formik.errors[name]),
      helperText: formik.touched[name] && (formik.errors[name] as string),
      // Ensures placeholder is always visible.
      InputLabelProps: { shrink: true },
      placeholder,
      label,
    };
  };

  const integerInputPropHelper = (name: keyof InterestFormData, label: string, placeholder: string) => {
    return {
      ...textInputPropHelper(name, label, placeholder),
      // Strip leading zeroes.
      value: isNaN(formik.values[name] as number) ? formik.values[name] : Number(formik.values[name]).toString(),
    };
  };

  const startDateInputPropHelper = (label: string) => {
    return {
      inputFormat: 'ddd, D MMM yyyy',
      value: formik.values.start,
      minDate: moment().add(1, 'day').startOf('day'),
      onChange: async (value: Moment | null) => {
        const corrected = value === null ? value : value.startOf('day');
        await formik.setFieldValue('start', corrected, true);
        await formik.setFieldTouched('start', true);
      },
      onClose: () => formik.setFieldTouched('start', true),
      renderInput: (props: MuiTextFieldProps) => (
        <TextField
          {...props}
          error={formik.touched.start && Boolean(formik.errors.start)}
          helperText={formik.touched.start && (formik.errors.start as string)}
          label={label}
          fullWidth
          required
        />
      ),
    };
  };

  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={interestFormSchema}
        onSubmit={async (values: InterestFormData) => interestFormSchema.validate(values).then(onSubmit)}
      >
        <Form>
          <Stack spacing={2}>
            {/* TODO: Charity selection is omitted as its model is TBD. */}
            <Stack spacing={2}>
              <Typography component="h2" variant="h3">
                Your Campaign
              </Typography>
              <TextField {...textInputPropHelper('campaignName', 'Name', 'Give your campaign a name.')} />
              <TextField
                {...textInputPropHelper(
                  'campaignDescription',
                  'Description',
                  'What inspired you to start this campaign?',
                )}
                multiline
                minRows={2}
              />
              <MobileDatePicker {...startDateInputPropHelper('Start Date')} />
              <Grid>
                <TextField
                  {...integerInputPropHelper('lengthOfCampaign', 'Length of Campaign', '')}
                  InputProps={{ endAdornment: <InputAdornment position="end">day(s)</InputAdornment> }}
                />
              </Grid>
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
              <TextField
                {...integerInputPropHelper('promisedAmount', 'Promised Amount', '')}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
              <Stack spacing={1}>
                <Typography variant="body2">Or choose an amount below:</Typography>
                <Grid direction="row" spacing={2} wrap="wrap">
                  {[500, 1000, 2500, 5000].map((value) => (
                    <Button
                      key={value}
                      variant="outlined"
                      onBlur={formik.handleBlur}
                      sx={amountButtonSx}
                      onClick={() => formik.handleChange({ target: { name: 'promisedAmount', value } })}
                    >
                      ${value}
                    </Button>
                  ))}
                </Grid>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography component="h2" variant="h3">
                Your Details
              </Typography>
              <TextField {...textInputPropHelper('donorName', 'Name', '')} />
              <TextField {...textInputPropHelper('donorEmail', 'Email', '')} />
            </Stack>
          </Stack>
          <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={submitButtonSx}>
            Submit
          </Button>
        </Form>
      </Formik>
    </Container>
  );
}
