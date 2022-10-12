import { NextPage } from 'next';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { MailOutline } from '@mui/icons-material';
import { Interest, InterestStatus } from '../types/interest';
import { WithoutId } from '../types/utils';
import { Stack } from '@mui/material';
import { formStackSx, mailIconSx } from '../styles/interest';
import moment from 'moment';
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
        <InterestForm onSubmit={onSubmit} />
      </Stack>
    </Container>
  );
};

export default InterestFormPage;
