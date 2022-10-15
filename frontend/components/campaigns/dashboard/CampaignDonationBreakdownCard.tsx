import { DonationBreakdownData } from '../../../types/donations';
import { CampaignCharityDonationData } from '../../../types/campaignCharities';
import { cardSx, donationTableHeaderSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import CompetingGraph from '../../charts/CompetingGraph';

interface Props {
  totalDonationBreakdown: DonationBreakdownData;
  charitiesDonations: CampaignCharityDonationData[];
}

interface DonationTableRowProps {
  label: string;
  donationBreakdown: DonationBreakdownData;
}

const DonationTableRow = ({ label, donationBreakdown }: DonationTableRowProps) => (
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

const CampaignDonationBreakdownCard = ({ totalDonationBreakdown, charitiesDonations }: Props) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    <Typography variant="h3">Donation Breakdown</Typography>

    <TableContainer component="div">
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
          <DonationTableRow label="Total" donationBreakdown={totalDonationBreakdown} />

          {charitiesDonations.map((charityDonation, index) => (
            <DonationTableRow key={index} label={charityDonation.charity.name} donationBreakdown={charityDonation} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
);

export default CampaignDonationBreakdownCard;
