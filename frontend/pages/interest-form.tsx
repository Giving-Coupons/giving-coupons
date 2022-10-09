import { NextPage } from 'next';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { MailOutline } from '@mui/icons-material';
import { Interest, interestSchema, InterestStatus } from '../types/interest';
import { WithoutId } from '../types/utils';
import { FormRenderFunctionProps } from '../hooks/useCustomForm';
import useCustomForm from '../hooks/useCustomForm';
import { Stack, Typography } from '@mui/material';
import { formStackSx, mailIconSx } from '../styles/interestForm';

const interestsApi = api.interests;
const InterestFormPage: NextPage = () => {
  const interestForm = useCustomForm<WithoutId<Interest>>({
    // Set charities to [{ id: 1 }] because its not worth building charity selection component rn.
    // Set status to PENDING as this value cannot be changed by the form.
    // Set coupon denomination to $10 as we currently do not plan on allowing people to submit other variations.
    initialData: { charities: [{ id: 1 }], status: InterestStatus.PENDING, couponDenomination: 10 },
    schema: interestSchema,
    renderFn: renderForm,
    submitFn: (x) => interestsApi.addInterest(x),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Stack sx={formStackSx}>
        <Avatar sx={mailIconSx}>
          <MailOutline />
        </Avatar>
        <Stack spacing={1}>
          <Typography component="h1" align="center" variant="h2">
            Contact Us
          </Typography>
          <Typography variant="subtitle1" align="left">
            Interested in being a primary donor? Fill in this form! <br />
          </Typography>
          <Typography variant="body2">
            If you are unsure of any of the details, please make a reasonable estimation. We will reach out to you as
            soon as possible.
          </Typography>
        </Stack>
        {interestForm}
      </Stack>
    </Container>
  );
};

function renderForm({
  createDatePicker,
  createErrorMessages,
  createMoneyField,
  createSubmitButton,
  createTextField,
}: FormRenderFunctionProps<WithoutId<Interest>>) {
  return (
    <>
      <Grid container spacing={2}>
        {createTextField('donorName', 'Name')}
        {createTextField('donorEmail', 'Email')}
        {createTextField('campaignName', 'Campaign name')}
        {createTextField('campaignDescription', 'Campaign description')}
        {/* Charity selection is omitted as the model is TBD and its hard to visualize what it will look like. */}
        {createMoneyField('promisedAmount', 'Promised Amount')}
        {createDatePicker('start', 'Start Date')}
        {createDatePicker('end', 'End Date')}
      </Grid>
      {createSubmitButton('Submit')}
      {createErrorMessages()}
    </>
  );
}

export default InterestFormPage;
