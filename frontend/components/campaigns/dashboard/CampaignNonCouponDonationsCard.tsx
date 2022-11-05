import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Moment } from 'moment';
import {
  nonCouponDonationsTableContainerSx,
  nonCouponDonationsTableHeaderSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignAdminData } from '../../../types/campaigns';
import { CharityData } from '../../../types/charity';
import { SecondaryDonationData } from '../../../types/donations';
import { DATETIME_FORMAT } from '../../../utils/constants';
import SimpleTable from '../../generic/SimpleTable';
import CampaignCard from './CampaignCard';

interface Props {
  campaign: CampaignAdminData;
  nonCouponDonations: SecondaryDonationData[];
}

const CampaignNonCouponDonationsCard = ({ campaign, nonCouponDonations }: Props) => {
  const charities: Record<number, CharityData> = {};
  campaign.charities.forEach((c) => (charities[c.id] = c.charity));

  return (
    <CampaignCard>
      <Stack sx={nonCouponDonationsTableHeaderSx} component="div" direction="row" spacing={2}>
        <Typography variant="h3" flex={2}>
          Additional Donations
        </Typography>
      </Stack>

      <SimpleTable
        sx={nonCouponDonationsTableContainerSx}
        columns={[
          { title: 'ID', key: 'id' },
          {
            title: 'Charity',
            key: 'campaignCharityId',
            transformValue: (campaignCharityId: number) => charities[campaignCharityId]?.name,
            getSortValue: (campaignCharityId: number) => charities[campaignCharityId]?.name,
            notPresentIs: 'last',
          },
          {
            title: 'Amount',
            key: 'amount',
            transformValue: (amount: number) => `$${amount}`,
          },
          {
            title: 'Donated At',
            key: 'donatedAt',
            transformValue: (donatedAt: Moment) => donatedAt.format(DATETIME_FORMAT),
            getSortValue: (donatedAt: Moment) => donatedAt.valueOf(),
          },
        ]}
        rows={nonCouponDonations}
        shouldUsePaper={false}
        initialOrder={{ order: 'asc', orderBy: 'id' }}
      />
    </CampaignCard>
  );
};

export default CampaignNonCouponDonationsCard;
