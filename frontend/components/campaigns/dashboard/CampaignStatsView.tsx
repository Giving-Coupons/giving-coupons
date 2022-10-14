import {
  cardSx,
  donationTableHeaderSx,
  sectionSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Stack } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DonationBreakdownData } from '../../../types/donations';
import { CampaignCharityDonationData } from '../../../types/campaignCharities';
import CompetingGraph from '../../charts/CompetingGraph';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    {children}
  </Stack>
);

interface Props {
  totalDonationBreakdown: DonationBreakdownData;
  charitiesDonations: CampaignCharityDonationData[];
}

interface StatsTableRowProps {
  label: string;
  donationBreakdown: DonationBreakdownData;
}

const StatsTableRow = ({ label, donationBreakdown }: StatsTableRowProps) => (
  <TableRow>
    <TableCell>{label}</TableCell>

    <TableCell>
      <Stack sx={donationTableHeaderSx} component="div" direction="row">
        <Typography variant="caption">${donationBreakdown.primaryDonor.amount}</Typography>

        <Typography variant="caption">${donationBreakdown.secondaryDonors.amount}</Typography>
      </Stack>

      <CompetingGraph
        barFractions={[donationBreakdown.primaryDonor.fraction, donationBreakdown.secondaryDonors.fraction]}
      />
    </TableCell>
  </TableRow>
);

const CampaignStatsView = ({ totalDonationBreakdown, charitiesDonations }: Props) => {
  return (
    <Stack sx={sectionSx} component="div" spacing={4}>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Charity</TableCell>

              <TableCell align="center">
                <Stack sx={donationTableHeaderSx} component="div" direction="row">
                  <Typography variant="caption">Primary donor</Typography>

                  <Typography variant="caption">Secondary donors</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <StatsTableRow label="Total" donationBreakdown={totalDonationBreakdown} />

            {charitiesDonations.map((charityDonation, index) => (
              <StatsTableRow key={index} label={charityDonation.charity.name} donationBreakdown={charityDonation} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CampaignStatsView;
