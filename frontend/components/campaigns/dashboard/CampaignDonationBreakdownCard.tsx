import { DonationBreakdownData } from '../../../types/donations';
import { CampaignCharityData, CampaignCharityDonationData } from '../../../types/campaignCharities';
import {
  charityContainerSx,
  charityItemSx,
  donationTableHeaderSx,
  logoSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import {
  Avatar,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { ReactNode } from 'react';
import CompetingGraph from '../../charts/CompetingGraph';
import CampaignCard from './CampaignCard';
import Link from 'next/link';

interface Props {
  totalDonationBreakdown: DonationBreakdownData;
  charitiesDonations: CampaignCharityDonationData[];
}

interface DonationTableRowProps {
  label: ReactNode;
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

const CharityDonationLabel = (campaignCharity: CampaignCharityData) => (
  <Stack sx={charityContainerSx} component="div" direction="row" spacing={2}>
    <Avatar sx={logoSx} variant="square" src={campaignCharity.charity.logoBase64} />

    <Stack sx={charityItemSx} component="div">
      <Typography variant="h4">{campaignCharity.charity.name}</Typography>

      <MuiLink component={Link} href={campaignCharity.givingSgUrl}>
        <a>
          <Typography variant="caption" color="info.main">
            {campaignCharity.givingSgUrl}
          </Typography>
        </a>
      </MuiLink>
    </Stack>
  </Stack>
);

const CampaignDonationBreakdownCard = ({ totalDonationBreakdown, charitiesDonations }: Props) => (
  <CampaignCard>
    <Typography variant="h3">Donation Breakdown</Typography>

    <TableContainer component="div">
      <Table>
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>

        <TableHead>
          <TableRow>
            <TableCell>Charity</TableCell>

            <TableCell align="center">
              <Stack sx={donationTableHeaderSx} component="div" direction="row">
                <Typography variant="caption">Primary</Typography>

                <Typography variant="caption">Secondary</Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <DonationTableRow label="Total" donationBreakdown={totalDonationBreakdown} />

          {charitiesDonations.map((charityDonation, index) => (
            <DonationTableRow
              key={index}
              label={CharityDonationLabel(charityDonation)}
              donationBreakdown={charityDonation}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </CampaignCard>
);

export default CampaignDonationBreakdownCard;
