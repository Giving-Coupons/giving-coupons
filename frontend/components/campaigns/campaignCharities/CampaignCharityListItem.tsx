import { Box, Stack, Typography } from '@mui/material';
import {
  charityLogoSx,
  donationBreakdownItemContainer,
  donationBreakdownLabelSx,
  rightBarSx,
} from '../../../styles/campaigns/detailStyles';
import { graphSx } from '../../../styles/components/charities/CampaignCharityListStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import HorizontalBarGraph from '../../charts/HorizontalBarGraph';

type Props = {
  width: number;
  campaignCharity: CampaignCharityDonationPublicData;
};

export default function CampaignCharityListItem({ width, campaignCharity }: Props) {
  const { amount: primaryAmount, fraction: primaryFraction } = campaignCharity.primaryDonation;
  const { amount: secondaryAmount, fraction: secondaryFraction } = campaignCharity.secondaryDonation;
  const totalAmount = primaryAmount + secondaryAmount;
  const hasDonations = totalAmount > 0;

  const bars =
    primaryFraction !== null && secondaryFraction !== null
      ? [
          { fraction: primaryFraction, label: `$${primaryAmount}` },
          { fraction: secondaryFraction, label: `$${secondaryAmount}` },
        ]
      : [{ fraction: 1, label: `$${primaryAmount || secondaryAmount}` }];

  return (
    <Stack direction="row" sx={donationBreakdownItemContainer} spacing={2}>
      <Stack sx={donationBreakdownLabelSx} spacing={1}>
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

        <Typography variant="h4">{campaignCharity.charity.name}</Typography>
      </Stack>

      {hasDonations ? (
        <Box width={`calc(80% * ${width})`}>
          <HorizontalBarGraph
            bars={bars}
            overrideGraphSx={graphSx}
            overrideLastBarSx={rightBarSx}
            labelProps={{ variant: 'h4' }}
          />
        </Box>
      ) : (
        <Typography variant="body1">No donations to date ☹</Typography>
      )}
    </Stack>
  );
}
