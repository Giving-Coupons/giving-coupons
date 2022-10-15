import { Box, Stack } from '@mui/system';
import Head from 'next/head';
import { Typography } from '@mui/material';
import Button from '../../../components/generic/Button';
import AddIcon from '@mui/icons-material/Add';
import { headerSx, logoSx, rootSx } from '../../../styles/admin/charities/indexStyles';
import { useRouter } from 'next/router';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import useSWR from 'swr';
import api from '../../../frontendApis';
import { CharityListData } from '../../../types/charity';
import SimpleTable from '../../../components/generic/SimpleTable';
import CharitiesAPI from '../../../frontendApis/charities';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import Delete from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import { Nullable } from '../../../types/utils';
import CharityDeletionDialog from '../../../components/charities/CharityDeletionDialog';
import { Base64String } from '../../../types/Base64';

const AdminCharities = () => {
  const router = useRouter();
  useAdminLoginCheck();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCharity, setSelectedCharity] = useState<Nullable<CharityListData>>(null);
  const { data: charities, mutate: refresh } = useSWR<Nullable<CharityListData[]>>(
    CharitiesAPI.CHARITIES_URL,
    async () => api.charities.list().then((res) => res.payload),
  );

  const handleOpenDeleteDialog = (charity: CharityListData) => {
    setOpenDeleteDialog(true);
    setSelectedCharity(charity);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCharity(null);
  };

  const createLogos = (logoBase64: Base64String) => logoBase64 && <Box component="img" src={logoBase64} sx={logoSx} />;
  const deleteCharityAction = {
    component: <IconButtonWithTooltip icon={<Delete />} tooltip="Delete charity" />,
    onClick: handleOpenDeleteDialog,
  };
  const editCharityAction = {
    component: <IconButtonWithTooltip icon={<Edit />} tooltip="Edit charity" />,
    onClick: ({ id }: CharityListData) => router.push(`/admin/charities/${id}/edit`),
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
            { title: 'Logo', key: 'logoBase64', transformValue: createLogos },
            { title: 'Name', key: 'name' },
          ]}
          actions={[deleteCharityAction, editCharityAction]}
        />
      </Box>

      {selectedCharity && (
        <CharityDeletionDialog
          selectedCharity={selectedCharity}
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          handleConfirm={({ id }) =>
            api.charities
              .deleteCharity(id)
              .then(handleCloseDeleteDialog)
              .then(() => refresh())
          }
        />
      )}
    </Box>
  );
};

export default AdminCharities;
