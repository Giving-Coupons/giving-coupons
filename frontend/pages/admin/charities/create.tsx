import { Box, Container } from '@mui/system';
import Head from 'next/head';
import CharityForm, { charitySchema } from '../../../components/charities/form/CharityForm';
import { containerSx } from '../../../styles/admin/charities/createStyles';
import { CharityFormData, CharityPostData } from '../../../types/charity';
import * as Yup from 'yup';
import api from '../../../frontendApis';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';

const CharityCreate = () => {
  const router = useRouter();
  useAdminLoginCheck();

  const handleSubmit = (values: CharityFormData) => {
    charitySchema
      .validate(values)
      .then((values: Yup.InferType<typeof charitySchema>) => {
        const charityPostData: CharityPostData = {
          ...values,
        };

        return api.charities.addCharity(charityPostData);
      })
      .then(() => {
        router.push('/admin/charities');
      });
  };

  return (
    <Box>
      <Head>
        <title>Create Charities</title>
      </Head>

      <Container sx={containerSx} component="main" maxWidth="sm">
        <CharityForm title="Create Charity" submitButtonTitle="Create" initialValues={{}} onSubmit={handleSubmit} />
      </Container>
    </Box>
  );
};

export default CharityCreate;
