import { Box, Container } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import CharityForm, { charitySchema } from '../../../components/charities/form/CharityForm';
import api from '../../../frontendApis';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { containerSx } from '../../../styles/admin/charities/createStyles';
import { CharityFormData, CharityPostData } from '../../../types/charity';

const CharityCreate = () => {
  const router = useRouter();
  useAdminLoginCheck();

  const handleSubmit = async (values: CharityFormData) => {
    return charitySchema
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
        <title>Create Charity</title>
      </Head>

      <Container sx={containerSx} component="main" maxWidth="sm">
        <CharityForm title="Create Charity" submitButtonTitle="Create" initialValues={{}} onSubmit={handleSubmit} />
      </Container>
    </Box>
  );
};

export default CharityCreate;
