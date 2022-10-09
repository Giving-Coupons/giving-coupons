import { NextPage } from 'next';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { LockOpenOutlined } from '@mui/icons-material';
import { Interest, interestSchema, InterestStatus } from '../types/interest';
import { WithoutId } from '../types/utils';
import { FormRenderFunctionProps } from '../hooks/useCustomForm';
import useCustomForm from '../hooks/useCustomForm';

const interestsApi = api.interests;
const InterestFormPage: NextPage = () => {
  const interestForm = useCustomForm<WithoutId<Interest>>({
    // Set charities to [{ id: 1 }] because its not worth building charity selection component rn.
    // Set status to PENDING as this value cannot be changed by the form.
    initialData: { charities: [{ id: 1 }], status: InterestStatus.PENDING },
    schema: interestSchema,
    renderFn: renderForm,
    submitFn: (x) => interestsApi.addInterest(x),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenOutlined />
        </Avatar>
        {interestForm}
      </Box>
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
        {createMoneyField('couponDenomination', 'Coupon Denomination')}
        {createDatePicker('start', 'Start Date')}
        {createDatePicker('end', 'End Date')}
      </Grid>
      {createSubmitButton('Submit')}
      {createErrorMessages()}
    </>
  );
}

export default InterestFormPage;
