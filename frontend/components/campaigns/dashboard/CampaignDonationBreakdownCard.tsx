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
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  charityContainerSx,
  charityItemSx,
  donationTableHeaderSx,
  logoSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignCharityData, CampaignCharityDonationData } from '../../../types/campaignCharities';
import { DonationBreakdownData } from '../../../types/donations';
import CompetingGraph from '../../charts/CompetingGraph';
import CampaignCard from './CampaignCard';

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
        <Typography variant="caption">${donationBreakdown.primaryDonation.amount}</Typography>

        <Typography variant="caption">${donationBreakdown.secondaryDonation.amount}</Typography>
      </Stack>

      <CompetingGraph
        barFractions={[donationBreakdown.primaryDonation.fraction, donationBreakdown.secondaryDonation.fraction]}
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
            GivingSg Campaign
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
          <col width="30%" />
          <col width="70%" />
        </colgroup>

        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h4">Charity</Typography>
            </TableCell>

            <TableCell align="center">
              <Stack sx={donationTableHeaderSx} component="div" direction="row">
                <Typography variant="caption">
                  From {charitiesDonations[0]?.primaryDonor?.name || 'the campaign organizer'}
                </Typography>

                <Typography variant="caption">From the public</Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <DonationTableRow
            label={<Typography variant="h4">Total</Typography>}
            donationBreakdown={totalDonationBreakdown}
          />

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
