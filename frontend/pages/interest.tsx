import { NextPage } from 'next';
import * as Yup from 'yup';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { MailOutline } from '@mui/icons-material';
import { Interest, InterestStatus } from '../types/interest';
import { WithoutId } from '../types/utils';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, Stack, Typography } from '@mui/material';
import { formStackSx, mailIconSx } from '../styles/interestForm';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import moment, { Moment } from 'moment';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals';

const DEFAULT_COUPON_DENOMINATION = 10;
const interestsApi = api.interests;
type InterestFormData = Partial<Omit<Interest, 'id' | 'charities' | 'status' | 'couponDenomination'>>;

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
  start: Yup.date().required('Start date is required.').typeError('Start date must be a date.'),
  end: Yup.date()
    .required('End date is required.')
    .typeError('End date must be a date.')
    .min(Yup.ref('start'), 'End date must be after start date.'),
  // TODO: charities are not covered in this PR as the model is TBD.
  // charities: Yup.array(charitySchema).required(),
});

const InterestFormPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (formState: InterestFormData) =>
    interestFormSchema
      .validate(formState)
      .catch((error) => {
        error.errors.map((m: string) => enqueueSnackbar(m, { variant: 'error' }));
        throw error;
      })
      .then(fillDefaultValues)
      .then((x) => interestsApi.addInterest(x) /* Interceptor will enqueue snackbar on success / error. */)
      .catch(/* errors from validate and api have already been handled and can be ignored. */);

  const formik = useFormik({
    initialValues: {},
    validationSchema: interestFormSchema,
    onSubmit,
  });

  const fillDefaultValues: (arg: Required<InterestFormData>) => WithoutId<Interest> = (formData) => {
    return {
      ...formData,
      // TODO: charities are not covered in this PR as its model is TBD.
      charities: [{ id: 1 }],
      status: InterestStatus.PENDING,
      couponDenomination: DEFAULT_COUPON_DENOMINATION,
    };
  };

  const textInputPropHelper = (name: keyof InterestFormData) => {
    return {
      id: name,
      name: name,
      type: 'text',
      required: true,
      fullWidth: true,
      value: formik.values[name],
      onChange: formik.handleChange,
      error: formik.touched[name] && Boolean(formik.errors[name]),
      helperText: formik.touched[name] && (formik.errors[name] as string),
      onBlur: formik.handleBlur,
    };
  };

  const moneyInputPropHelper = (name: keyof InterestFormData) => {
    return {
      ...textInputPropHelper(name),
      // Strip leading zeroes.
      InputProps: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
      value: isNaN(formik.values[name] as number) ? formik.values[name] : Number(formik.values[name]).toString(),
    };
  };

  const datePickerPropHelper = (name: keyof InterestFormData, label: string) => {
    return {
      inputFormat: 'ddd, D MMM yyyy',
      value: formik.values[name],
      renderInput: (props: MuiTextFieldProps) => (
        <TextField
          {...props}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && (formik.errors[name] as string)}
          onBlur={formik.handleBlur}
          label={label}
          fullWidth
          required
        />
      ),
    };
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack sx={formStackSx}>
        <Avatar sx={mailIconSx}>
          <MailOutline />
        </Avatar>
        <Stack spacing={1} marginBottom={2}>
          <Typography component="h1" align="center" variant="h2">
            Interested in starting a campaign?
          </Typography>
          <Typography variant="subtitle1" align="center">
            Fill up the form below and we will get back to you!
          </Typography>
          <Typography variant="body2"></Typography>
        </Stack>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography component="h2" variant="h3">
                  Your Details
                </Typography>
                <TextField {...textInputPropHelper('donorName')} label="Name" />
                <TextField {...textInputPropHelper('donorEmail')} label="Email" />
              </Stack>
              <TextField {...textInputPropHelper('campaignName')} label="Campaign name" />
              <TextField {...textInputPropHelper('campaignDescription')} label="Campaign description" />
              {/* TODO: Charity selection is omitted as its model is TBD. */}
              <TextField {...moneyInputPropHelper('promisedAmount')} label="Promised Amount" />
              <MobileDatePicker
                {...datePickerPropHelper('start', 'Start Date')}
                disablePast
                onChange={(value: Moment | null) => formik.setFieldValue('start', value?.startOf('day'), true)}
              />
              {/* Use duration picker instead. */}
              <MobileDatePicker
                {...datePickerPropHelper('end', 'End Date')}
                minDate={moment(formik.values.start ?? moment().startOf('day')).clone()}
                onChange={(value: Moment | null) => formik.setFieldValue('end', value?.endOf('day'), true)}
              />
            </Stack>
            <Button type="submit" disabled={!formik.isValid} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </form>
          <Button onClick={() => console.dir(formik)}>Foo</Button>
        </LocalizationProvider>
      </Stack>
    </Container>
  );
};

export default InterestFormPage;
