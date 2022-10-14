import { Box, Container } from '@mui/system';
import Head from 'next/head';
import useSWR from 'swr';
import CharityForm, { charitySchema } from '../../../../components/charities/form/CharityForm';
import { containerSx } from '../../../../styles/admin/charities/createStyles';
import { CharityData, CharityFormData, CharityPutData } from '../../../../types/charity';
import * as Yup from 'yup';
import api from '../../../../frontendApis';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import { errorStackSx } from '../../../../styles/admin/charities/editStyles';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';

const CharityEdit = () => {
  useAdminLoginCheck();
  const router = useRouter();

  // Note that the router query parameters will all be undefined on initial render.
  const { query } = router;
  const charityId = query.charityId ? Number(query.charityId) : undefined;
  const { data: initialValues, error } = useSWR<CharityFormData | undefined>([charityId], getCharityData);
  const isLoading = !initialValues && !error;

  const handleSubmit = (values: CharityFormData) => {
    charitySchema
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
        {initialValues ? (
          <CharityForm
            title="Edit Charity"
            submitButtonTitle="Edit"
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        ) : (
          <></>
        )}
        {isLoading ? (
          <Stack>
            <Typography variant="h1">Loading...</Typography>
          </Stack>
        ) : (
          <></>
        )}
        {error ? (
          <Stack spacing={2} sx={errorStackSx}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        ) : (
          <></>
        )}
      </Container>
    </Box>
  );
};

const getCharityData = (charityId: number | undefined): Promise<CharityData | undefined> => {
  if (charityId === undefined) {
    // Router is still loading query.
    return Promise.resolve(undefined);
  }

  return api.charities.getCharity(charityId).then((res) => {
    if (res.payload === null) {
      // Defensive programming to ensure only non-null charity data is populated.
      throw new Error();
    }
    return res.payload ?? undefined;
  });
};

export default CharityEdit;
