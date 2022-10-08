import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import { InterestData, InterestStatus } from '../../../types/interest';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import DeleteButton from '../../../components/DeleteButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Tabbed from '../../../components/Tabs';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import useSWR from 'swr';
import api from '../../../frontendApis';
import { Nullable } from '../../../types/utils';
import { theme } from '../../../utils/theme';
import InterestsAPI from '../../../frontendApis/interests';

export default function Interests() {
  const { data: pendingInterests } = useSWR<Nullable<InterestData[]>>(InterestsAPI.INTERESTS_URL, () =>
    api.interests.getPendingInterests().then((r) => r.payload),
  );

  // const { data: approvedInterests } = useSWR<Nullable<InterestData[]>>('/api/interests/approved', () =>
  //   api.interests.getAcceptedInterests().then((r) => r.payload),
  // );

  // const { data: rejectedInterests } = useSWR<Nullable<InterestData[]>>('/api/interests/rejected', () =>
  //   api.interests.getAcceptedInterests().then((r) => r.payload),
  // );

  const makeInterestsTable = (interests: Nullable<InterestData[]> | undefined) => (
    <SimpleTable
      columns={[
        { title: 'ID', key: 'id' },
        { title: 'Donor Name', key: 'donorName' },
        { title: 'Donor Email', key: 'donorEmail' },
        { title: 'Campaign Name', key: 'campaignName' },
        { title: 'Campaign Description', key: 'campaignDescription' },
        { title: 'Promised Amount', key: 'promisedAmount' },
        { title: 'Start', key: 'start', transformValue: (value) => new Date(value).toLocaleDateString() },
        { title: 'End', key: 'end', transformValue: (value) => new Date(value).toLocaleDateString() },
        { title: 'Status', key: 'status' },
        { title: 'Coupon Denomination', key: 'couponDenomination' },
      ]}
      rows={interests ?? []}
      isLoading={interests === undefined}
      actions={[
        <IconButtonWithTooltip key="approve" icon={<DoneIcon />} tooltip="Approve" />,
        <IconButtonWithTooltip key="reject" icon={<ClearIcon />} tooltip="Reject" />,
        <DeleteButton
          key="delete"
          onDelete={() => {
            alert('deleted');
          }}
        />,
      ]}
    />
  );

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Typography variant="h1" gutterBottom>
        Interests
      </Typography>
      <Paper>
        <Tabbed
          tabs={[
            {
              label: 'Pending',
              content: makeInterestsTable(pendingInterests),
            },
            {
              label: 'Approved',
              content: makeInterestsTable(pendingInterests),
            },
            {
              label: 'Rejected',
              content: makeInterestsTable(pendingInterests),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
