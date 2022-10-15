import { Box, Container } from '@mui/system';
import Head from 'next/head';
import useSWR from 'swr';
import CharityForm, { charitySchema } from '../../../../components/charities/form/CharityForm';
import { containerSx } from '../../../../styles/admin/charities/createStyles';
import { CharityFormData, CharityPutData } from '../../../../types/charity';
import * as Yup from 'yup';
import api from '../../../../frontendApis';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import { errorStackSx } from '../../../../styles/admin/charities/editStyles';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { isInteger } from 'formik';
import { Nullable } from '../../../../types/utils';

const CharityEdit = () => {
  useAdminLoginCheck();
  const router = useRouter();

  // Note that the router query parameters will all be undefined on initial render.
  const { query } = router;
  const charityId = query.charityId ? Number(query.charityId) : undefined;
  const { data: initialValues, error } = useSWR<Nullable<CharityFormData>>([charityId], (charityId) =>
    isInteger(charityId) ? api.charities.getCharity(Number(charityId)).then((res) => res.payload) : null,
  );
  const isLoading = !initialValues && !error;

  const handleSubmit = async (values: CharityFormData) => {
    if (!isInteger(charityId)) {
      // This should never be available as useSWR will set error / loading and form will not be visible. (Defensive)
      return Promise.reject('Charity ID is not an integer.');
    }

    return charitySchema
      .validate(values)
      .then((values: Yup.InferType<typeof charitySchema>) => {
        const charityPostData: CharityPutData = {
          ...values,
        };

        return api.charities.putCharity(charityId as number, charityPostData);
      })
      .then(() => {
        router.push('/admin/charities');
      });
  };

  return (
    <Box>
      <Head>
        <title>Edit Charity</title>
      </Head>

      <Container sx={containerSx} component="main" maxWidth="sm">
        {initialValues && (
          <CharityForm
            title="Edit Charity"
            submitButtonTitle="Save"
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        )}
        {isLoading && (
          <Stack>
            <Typography variant="h1">Loading...</Typography>
          </Stack>
        )}
        {error && (
          <Stack spacing={2} sx={errorStackSx}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default CharityEdit;
