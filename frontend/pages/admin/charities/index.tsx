import { Delete, Edit, Info } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Button from '../../../components/generic/Button';
import DeletionDialog from '../../../components/generic/DeletionDialog';
import SimpleTable from '../../../components/generic/SimpleTable';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import api from '../../../frontendApis';
import CharitiesAPI from '../../../frontendApis/charities';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { headerSx, logoSx, rootSx } from '../../../styles/admin/charities/indexStyles';
import { Base64String } from '../../../types/base64';
import { CharityListData } from '../../../types/charity';
import { Nullable } from '../../../types/utils';

const AdminCharities = () => {
  const router = useRouter();
  useAdminLoginCheck();
  const [selectedCharity, setSelectedCharity] = useState<Nullable<CharityListData>>(null);
  const { data: charities, mutate: refresh } = useSWR<Nullable<CharityListData[]>>(
    CharitiesAPI.CHARITIES_URL,
    async () => api.charities.list().then((res) => res.payload),
  );

  const handleCloseDeleteDialog = () => setSelectedCharity(null);
  const handleOpenDeleteDialog = (charity: CharityListData) => {
    setSelectedCharity(charity);
  };

  const createLogos = (logoUrl: Base64String) => logoUrl && <Box component="img" src={logoUrl} sx={logoSx} />;

  const viewCharityAction = {
    component: <IconButtonWithTooltip icon={<Info />} tooltip="View charity" />,
    onClick: ({ id }: CharityListData) => router.push(`/admin/charities/${id}`),
  };
  const editCharityAction = {
    component: <IconButtonWithTooltip icon={<Edit />} tooltip="Edit charity" />,
    onClick: ({ id }: CharityListData) => router.push(`/admin/charities/${id}/edit`),
  };
  const deleteCharityAction = {
    component: <IconButtonWithTooltip icon={<Delete />} tooltip="Delete charity" />,
    onClick: handleOpenDeleteDialog,
  };

  return (
    <Box>
      <Head>
        <title>Manage Charities</title>
      </Head>

      <Box component="main" sx={rootSx}>
        <Stack sx={headerSx} component="div" direction="row">
          <Typography variant="h1" gutterBottom>
            Charities
          </Typography>

          <Button actionType="primary" startIcon={<AddIcon />} onClick={() => router.push('/admin/charities/create')}>
            Create
          </Button>
        </Stack>

        <SimpleTable
          rows={charities ?? []}
          isLoading={!charities}
          columns={[
            { title: 'ID', key: 'id' },
            { title: 'Logo', key: 'logoUrl', transformValue: createLogos },
            { title: 'Name', key: 'name' },
          ]}
          actions={[viewCharityAction, editCharityAction, deleteCharityAction]}
        />
      </Box>

      <DeletionDialog
        open={selectedCharity !== null}
        handleClose={handleCloseDeleteDialog}
        handleDelete={() =>
          api.charities
            // Type assertion is safe as the dialog will be closed if selection is null.
            .deleteCharity(selectedCharity?.id as number)
            .then(handleCloseDeleteDialog)
            .then(() => refresh())
        }
        itemName={selectedCharity?.name ?? 'charity'}
        itemType="charity"
      />
    </Box>
  );
};

export default AdminCharities;
