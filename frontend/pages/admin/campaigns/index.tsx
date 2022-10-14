import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Button from '../../../components/generic/Button';
import SimpleTable from '../../../components/generic/SimpleTable';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import Tabbed from '../../../components/Tabs';
import api from '../../../frontendApis';
import CampaignsAPI from '../../../frontendApis/campaigns';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { headerSx, rootSx } from '../../../styles/admin/campaigns/indexStyles';
import { CampaignAdminListData } from '../../../types/campaigns';
import { Nullable } from '../../../types/utils';
import { DATE_FORMAT } from '../../../utils/constants';

const AdminCampaigns = () => {
  useAdminLoginCheck();
  const { data: campaigns } = useSWR<Nullable<CampaignAdminListData[]>>(CampaignsAPI.CAMPAIGNS_URL, () =>
    api.campaigns.adminList().then((r) => r.payload),
  );
  const router = useRouter();

  const upcomingCampaigns = campaigns?.filter((c) => c.start.isAfter(moment.now()));
  const activeCampaigns = campaigns?.filter((c) => c.start.isBefore(moment.now()) && c.end.isAfter(moment.now()));
  const completedCampaigns = campaigns?.filter((c) => c.end.isBefore(moment.now()));

  const makeCampaignsTable = (campaigns: Nullable<CampaignAdminListData[]> | undefined) => {
    const goToManageCampaignAction = {
      component: <IconButtonWithTooltip icon={<ManageAccountsIcon />} tooltip="Manage Campaign" />,
      onClick: (campaign: CampaignAdminListData) => router.push(`/admin/campaigns/${campaign.id}`),
    };

    return (
      <SimpleTable
        columns={[
          { title: 'ID', key: 'id' },
          { title: 'Campaign Name', key: 'name' },
          { title: 'Promised Amount', key: 'promisedAmount' },
          {
            title: 'Start Date',
            key: 'start',
            transformValue: (start) => start.format(DATE_FORMAT),
          },
          {
            title: 'End Date',
            key: 'end',
            transformValue: (end) => end.format(DATE_FORMAT),
          },
          { title: 'Primary Donor', key: 'primaryDonor', transformValue: (primaryDonor) => primaryDonor.name },
        ]}
        rows={campaigns ?? []}
        isLoading={campaigns === undefined}
        actions={[goToManageCampaignAction]}
      />
    );
  };

  return (
    <Box sx={rootSx}>
      <Head>
        <title>Manage Campaigns</title>
      </Head>

      <Box component="main">
        <Stack sx={headerSx} component="div" direction="row">
          <Typography variant="h1" gutterBottom>
            Campaigns
          </Typography>

          <Button actionType="primary" startIcon={<AddIcon />} onClick={() => router.push('/admin/campaigns/create')}>
            Create
          </Button>
        </Stack>
      </Box>

      <Paper>
        <Tabbed
          tabs={[
            {
              label: 'Upcoming',
              content: makeCampaignsTable(upcomingCampaigns),
            },
            {
              label: 'Active',
              content: makeCampaignsTable(activeCampaigns),
            },
            {
              label: 'Completed',
              content: makeCampaignsTable(completedCampaigns),
            },
          ]}
        />
      </Paper>
    </Box>
  );
};

export default AdminCampaigns;
