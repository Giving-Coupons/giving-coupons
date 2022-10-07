import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import { Interest, InterestStatus } from '../../../types/interest';

export default function Interests() {
  const data: Interest[] = [
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
      status: InterestStatus.PENDING,
      couponDenomination: 20,
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
      status: InterestStatus.PENDING,
      couponDenomination: 30,
    },
  ];

  return (
    <div>
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
        rows={data}
      />
    </div>
  );
}
