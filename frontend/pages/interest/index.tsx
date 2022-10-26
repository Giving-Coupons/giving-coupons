import { MailOutline } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import moment from 'moment';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import InterestForm, { InterestFormSubmitHandler } from '../../components/interests/form/InterestForm';
import api from '../../frontendApis';
import { formStackSx, mailIconSx } from '../../styles/interest';
import { InterestPostData, InterestStatus } from '../../types/interest';
import { log } from '../../utils/analytics';
import { DEFAULT_COUPON_DENOMINATION } from '../../utils/constants';

const interestsApi = api.interests;

const InterestFormPage: NextPage = () => {
  const router = useRouter();
  const onSubmit: InterestFormSubmitHandler = (formData) => {
    log('[InterestFormPage] Submit');

    const { lengthOfCampaign, ...data } = formData;
    const interestPostData: InterestPostData = {
      ...data,
      status: InterestStatus.PENDING,
      couponDenomination: DEFAULT_COUPON_DENOMINATION,
      start: moment(data.start),
      end: moment(data.start).clone().add(lengthOfCampaign, 'days'),
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
