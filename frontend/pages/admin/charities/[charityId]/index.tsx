import { Box } from '@mui/system';
import Head from 'next/head';
import useSWR from 'swr';
import { CharityData } from '../../../../types/charity';
import api from '../../../../frontendApis';
import { useRouter } from 'next/router';
import { Skeleton, Stack, Typography } from '@mui/material';
import {
  headerSx,
  imageContainerSx,
  logoContainerSx,
  rootSx,
  sadPathStackSx,
} from '../../../../styles/admin/charities/viewStyles';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { Nullable } from '../../../../types/utils';
import Button from '../../../../components/generic/Button';
import { Edit, List } from '@mui/icons-material';
import ImageWithOverlay from '../../../../components/generic/ImageWithOverlay';
import IconButtonWithTooltip from '../../../../components/IconButtonWithTooltip';

const CharityView = () => {
  useAdminLoginCheck();
  const router = useRouter();

  // Note that the router query parameters will all be undefined on initial render.
  const { query } = router;
  const charityId = query.charityId ? Number(query.charityId) : null;
  const { data: charityData, error } = useSWR<Nullable<CharityData>>([charityId], (charityId) =>
    charityId !== null ? api.charities.getCharity(charityId).then((res) => res.payload) : null,
  );
  const isLoading = !charityData && !error;

  return (
    <Box>
      <Head>
        <title>View Charity</title>
      </Head>

      <Stack sx={rootSx} spacing={2} component="div">
        {charityData && (
          <>
            <Stack sx={headerSx} spacing={2} component="div" direction="row">
              <Stack spacing={2} component="div" direction="row">
                <Box sx={logoContainerSx}>
                  {charityData?.logoBase64 && (
                    <ImageWithOverlay imageSrc={charityData?.logoBase64} shouldApplyOverlay={false} />
                  )}
                </Box>

                <Typography variant="h1" gutterBottom>
                  {charityData?.name ?? 'Charity'}
                </Typography>
              </Stack>

              <Stack spacing={2} component="div" direction="row">
                <IconButtonWithTooltip
                  icon={<Edit />}
                  tooltip="Edit charity"
                  onClick={() => router.push(`/admin/charities/${charityId}/edit`)}
                />

                <IconButtonWithTooltip
                  icon={<List />}
                  tooltip="Back to list"
                  onClick={() => router.push('/admin/charities/')}
                />
              </Stack>
            </Stack>

            <Box sx={imageContainerSx}>
              {charityData?.imageBase64 ? (
                <ImageWithOverlay imageSrc={charityData?.imageBase64} shouldApplyOverlay={false} />
              ) : (
                <Skeleton sx={imageContainerSx} />
              )}
            </Box>

            <Stack>
              {charityData.description.split('\n').map((paragraph, index) => (
                <Typography variant="body1" gutterBottom key={index}>
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </>
        )}

        {isLoading && (
          <Stack sx={sadPathStackSx}>
            <Typography variant="h1">Loading...</Typography>
          </Stack>
        )}

        {error && (
          <Stack sx={sadPathStackSx}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default CharityView;
