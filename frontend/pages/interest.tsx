import { NextPage } from 'next';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Container from '@mui/material/Container';
import { MailOutline } from '@mui/icons-material';
import { Interest, InterestStatus } from '../types/interest';
import { WithoutId } from '../types/utils';
import { Stack, Typography } from '@mui/material';
import { formStackSx, mailIconSx } from '../styles/interest';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import InterestForm, { InterestFormSubmitHandler } from '../components/interests/form/InterestForm';
import { DEFAULT_COUPON_DENOMINATION } from '../utils/constants';

const interestsApi = api.interests;

const InterestFormPage: NextPage = () => {
  const onSubmit: InterestFormSubmitHandler = (formData) => {
    const { lengthOfCampaign, ...data } = formData;
    const interestPostData: WithoutId<Interest> = {
      ...data,
      status: InterestStatus.PENDING,
      couponDenomination: DEFAULT_COUPON_DENOMINATION,
      end: moment(data.start).clone().add(lengthOfCampaign, 'days').toDate(),
      // TODO: charities are not covered in this PR as its model is TBD.
      charities: [{ id: 1 }],
    };

    return interestsApi.addInterest(interestPostData);
  };

  return (
    <Container component="main" maxWidth="sm">
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
        {/* TODO: Remove localization provider once @zognin merges her _app.tsx change. */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <InterestForm onSubmit={onSubmit} />
        </LocalizationProvider>
      </Stack>
    </Container>
  );
};

export default InterestFormPage;