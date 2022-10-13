import { Box, Container } from '@mui/system';
import Head from 'next/head';
import CharityForm from '../../../components/charities/form/CharityForm';
import { containerSx } from '../../../styles/admin/charities/createStyles';

const CharityCreate = () => {
  return (
    <Box>
      <Head>
        <title>Create Charities</title>
      </Head>

      <Container sx={containerSx} component="main" maxWidth="sm">
        <CharityForm title="Create Charity" submitButtonTitle="Create" initialValues={{}} onSubmit={() => undefined} />
      </Container>
    </Box>
  );
};

export default CharityCreate;
