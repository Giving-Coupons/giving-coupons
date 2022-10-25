import { Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import * as Yup from 'yup';
import CharityForm, { charitySchema } from '../../../../components/charities/form/CharityForm';
import api from '../../../../frontendApis';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { containerSx } from '../../../../styles/admin/charities/createStyles';
import { errorStackSx } from '../../../../styles/admin/charities/editStyles';
import { CharityData, CharityFormData, CharityPutData } from '../../../../types/charity';
import { Nullable } from '../../../../types/utils';

const CharityEdit = () => {
  useAdminLoginCheck();
  const router = useRouter();

  // Note that the router query parameters will all be undefined on initial render.
  const { query } = router;
  const charityId = query.charityId ? Number(query.charityId) : null;
  const { data: initialValues, error } = useSWR<Nullable<CharityData>>([charityId], (charityId) =>
    charityId !== null ? api.charities.getCharity(charityId).then((res) => res.payload) : null,
  );
  const isLoading = !initialValues && !error;

  const handleSubmit = (charityId: number | null) => async (values: CharityFormData) => {
    if (charityId === null) {
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
        router.push(`/admin/charities/${charityId}`);
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
            onSubmit={handleSubmit(charityId)}
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
