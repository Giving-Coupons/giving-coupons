import { Box, Container } from '@mui/system';
import Head from 'next/head';
import CharityForm from '../../../components/charities/form/CharityForm';

const CharityCreate = () => {
  return (
    <Box>
      <Head>
        <title>Create Charities</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <CharityForm title="Create Charity" submitButtonTitle="Create" initialValues={{}} onSubmit={() => undefined} />
      </Container>
    </Box>
  );
};

export default CharityCreate;
