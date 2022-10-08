import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import { InterestData, InterestStatus } from '../../../types/interest';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import DeleteButton from '../../../components/DeleteButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Tabbed from '../../../components/Tabs';
import { Box, Paper, Typography } from '@mui/material';
import useSWR from 'swr';
import api from '../../../frontendApis';
import { Nullable } from '../../../types/utils';
import { theme } from '../../../utils/theme';
import InterestsAPI from '../../../frontendApis/interests';

export default function Interests() {
  const { data: interests } = useSWR<Nullable<InterestData[]>>(InterestsAPI.INTERESTS_URL, () =>
    api.interests.getInterests().then((r) => r.payload),
  );

  const pendingInterests = interests?.filter((interest) => interest.status === InterestStatus.PENDING);
  const approvedInterests = interests?.filter((interest) => interest.status === InterestStatus.APPROVED);
  const rejectedInterests = interests?.filter((interest) => interest.status === InterestStatus.REJECTED);

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
              content: makeInterestsTable(approvedInterests),
            },
            {
              label: 'Rejected',
              content: makeInterestsTable(rejectedInterests),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
