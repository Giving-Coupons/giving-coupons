import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import { InterestData, InterestStatus } from '../../../types/interest';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import DeleteButton from '../../../components/DeleteButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Tabbed from '../../../components/Tabs';
import { Box, Paper, Typography } from '@mui/material';

export default function Interests() {
  const data: InterestData[] = [
    {
      id: 1,
      donorName: 'Donor 1',
      donorEmail: 'donor1@gmail.com',
      campaignName: 'Campaign 1',
      campaignDescription: 'Campaign 1 description',
      promisedAmount: 1000,
      start: new Date(2022, 11, 1),
      end: new Date(2022, 12, 0),
      status: InterestStatus.PENDING,
      couponDenomination: 10,
      charities: [],
    },
    {
      id: 2,
      donorName: 'Donor 2',
      donorEmail: 'donor2@gmail.com',
      campaignName: 'Campaign 2',
      campaignDescription: 'Campaign 2 description',
      promisedAmount: 2000,
      start: new Date(2022, 11, 1),
      end: new Date(2022, 12, 0),
      status: InterestStatus.APPROVED,
      couponDenomination: 20,
      charities: [],
    },
    {
      id: 3,
      donorName: 'Donor 3',
      donorEmail: 'donor3@gmail.com',
      campaignName: 'Campaign 3',
      campaignDescription: 'Campaign 3 description',
      promisedAmount: 3000,
      start: new Date(2022, 11, 1),
      end: new Date(2022, 12, 0),
      status: InterestStatus.REJECTED,
      couponDenomination: 30,
      charities: [],
    },
  ];

  const pendingInterests = data.filter((interest) => interest.status === InterestStatus.PENDING);
  const approvedInterests = data.filter((interest) => interest.status === InterestStatus.APPROVED);
  const rejectedInterests = data.filter((interest) => interest.status === InterestStatus.REJECTED);

  const makeInterestsTable = (interests: InterestData[]) => (
    <SimpleTable
      columns={[
        { title: 'ID', key: 'id' },
        { title: 'Donor Name', key: 'donorName' },
        { title: 'Donor Email', key: 'donorEmail' },
        { title: 'Campaign Name', key: 'campaignName' },
        { title: 'Campaign Description', key: 'campaignDescription' },
        { title: 'Promised Amount', key: 'promisedAmount' },
        { title: 'Start', key: 'start', transformValue: (value: Date) => value.toLocaleDateString() },
        { title: 'End', key: 'end', transformValue: (value: Date) => value.toLocaleDateString() },
        { title: 'Status', key: 'status' },
        { title: 'Coupon Denomination', key: 'couponDenomination' },
      ]}
      rows={interests}
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
    <Box sx={{ padding: '20px' }}>
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
