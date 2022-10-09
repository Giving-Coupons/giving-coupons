import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import { Interest, InterestData, InterestStatus } from '../../../types/interest';
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
  const { data: interests, mutate } = useSWR<Nullable<Interest[]>>(InterestsAPI.INTERESTS_URL, () =>
    api.interests.list().then((r) => r.payload),
  );

  const pendingInterests = interests?.filter((interest) => interest.status === InterestStatus.PENDING);
  const approvedInterests = interests?.filter((interest) => interest.status === InterestStatus.APPROVED);
  const rejectedInterests = interests?.filter((interest) => interest.status === InterestStatus.REJECTED);

  const makeInterestsTable = (interests: Nullable<Interest[]> | undefined, status: InterestStatus) => {
    const approveAction = {
      component: <IconButtonWithTooltip icon={<DoneIcon />} tooltip="Approve" />,
      onClick: (interest: Interest) => {
        api.interests.approveInterest(interest.id).then(() => mutate());
      },
    };

    const rejectAction = {
      component: <IconButtonWithTooltip icon={<ClearIcon />} tooltip="Reject" />,
      onClick: (interest: Interest) => {
        api.interests.rejectInterest(interest.id).then(() => mutate());
      },
    };

    const deleteAction = {
      component: <DeleteButton />,
      onClick: (interest: Interest) => {
        api.interests.deleteInterest(interest.id).then(() => mutate());
      },
    };

    return (
      <SimpleTable
        columns={[
          { title: 'ID', key: 'id' },
          { title: 'Donor Name', key: 'donorName' },
          { title: 'Donor Email', key: 'donorEmail' },
          { title: 'Campaign Name', key: 'campaignName' },
          { title: 'Campaign Description', key: 'campaignDescription' },
          { title: 'Promised Amount', key: 'promisedAmount' },
          { title: 'Start', key: 'start', transformValue: (date) => date.toLocaleDateString() },
          { title: 'End', key: 'end', transformValue: (date) => date.toLocaleDateString() },
          { title: 'Coupon Denomination', key: 'couponDenomination' },
        ]}
        rows={interests ?? []}
        isLoading={interests === undefined}
        actions={[
          ...(status === InterestStatus.PENDING ? [approveAction, rejectAction] : []), // Only pending interests can be approved/rejected
          ...(status !== InterestStatus.APPROVED ? [deleteAction] : []), // Approved interests cannot be deleted
        ]}
      />
    );
  };

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
              content: makeInterestsTable(pendingInterests, InterestStatus.PENDING),
            },
            {
              label: 'Approved',
              content: makeInterestsTable(approvedInterests, InterestStatus.APPROVED),
            },
            {
              label: 'Rejected',
              content: makeInterestsTable(rejectedInterests, InterestStatus.REJECTED),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
