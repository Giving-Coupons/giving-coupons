import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  charityLogoContainerSx,
  charityLogoSx,
  graphSx,
} from '../../../styles/components/charities/CampaignCharityCardStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import { theme } from '../../../utils/theme';
import SmallCompetingGraph from '../../charts/SmallCompetingGraph';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
}

const CampaignCharityCard = ({ campaignCharity }: Props) => {
  const primaryDonorDonationData = campaignCharity.primaryDonation;
  const secondaryDonorDonationData = campaignCharity.secondaryDonation;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        boxShadow: `0px 0px 30px 10px ${theme.palette.neutral.light}`,
        borderRadius: '10px',
      }}
    >
      <Grid xs={2} sx={charityLogoContainerSx}>
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />
      </Grid>

      <Grid xs={10}>
        <Stack paddingTop={1} paddingBottom={1} paddingRight={1}>
          <Typography variant="h5">{campaignCharity.charity.name}</Typography>

          <SmallCompetingGraph
            overrideGraphSx={graphSx}
            leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
            rightLabel={`$${secondaryDonorDonationData.amount} from people like you`}
            barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CampaignCharityCard;
