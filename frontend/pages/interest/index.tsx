import { NextPage } from 'next';
import api from '../../frontendApis';
import { MailOutline } from '@mui/icons-material';
import { InterestPostData, InterestStatus } from '../../types/interest';
import { Avatar, Container, Stack } from '@mui/material';
import { formStackSx, mailIconSx } from '../../styles/interest';
import moment from 'moment';
import InterestForm, { InterestFormSubmitHandler } from '../../components/interests/form/InterestForm';
import { DEFAULT_COUPON_DENOMINATION } from '../../utils/constants';
import { Box } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';

const interestsApi = api.interests;

const InterestFormPage: NextPage = () => {
  const router = useRouter();
  const onSubmit: InterestFormSubmitHandler = (formData) => {
    const { lengthOfCampaign, ...data } = formData;
    const interestPostData: InterestPostData = {
      ...data,
      status: InterestStatus.PENDING,
      couponDenomination: DEFAULT_COUPON_DENOMINATION,
      start: moment(data.start).toISOString(),
      end: moment(data.start).clone().add(lengthOfCampaign, 'days').toISOString(),
    };

    return interestsApi.addInterest(interestPostData).then(() => router.push('/interest/thank-you'));
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
