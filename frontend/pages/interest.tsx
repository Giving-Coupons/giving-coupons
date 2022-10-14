import { NextPage } from 'next';
import api from '../frontendApis';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { MailOutline } from '@mui/icons-material';
import { InterestPostData, InterestStatus } from '../types/interest';
import { Stack } from '@mui/material';
import { formStackSx, mailIconSx } from '../styles/interest';
import moment from 'moment';
import InterestForm, { InterestFormSubmitHandler } from '../components/interests/form/InterestForm';
import { DEFAULT_COUPON_DENOMINATION } from '../utils/constants';
import { Box } from '@mui/system';
import Head from 'next/head';

const interestsApi = api.interests;

const InterestFormPage: NextPage = () => {
  const onSubmit: InterestFormSubmitHandler = (formData) => {
    const { lengthOfCampaign, ...data } = formData;
    const interestPostData: InterestPostData = {
      ...data,
      status: InterestStatus.PENDING,
      couponDenomination: DEFAULT_COUPON_DENOMINATION,
      start: moment(data.start).toISOString(),
      end: moment(data.start).clone().add(lengthOfCampaign, 'days').toISOString(),
    };

    return interestsApi.addInterest(interestPostData);
  };

  return (
    <Box>
      <Head>
        <title>Interest</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <Stack sx={formStackSx}>
          <Avatar sx={mailIconSx}>
            <MailOutline />
          </Avatar>
          <InterestForm onSubmit={onSubmit} />
        </Stack>
      </Container>
    </Box>
  );
};

export default InterestFormPage;
