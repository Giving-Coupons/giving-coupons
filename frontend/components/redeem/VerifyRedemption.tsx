import PersonIcon from '@mui/icons-material/Person';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { headerSx, iconSx, imageSx, stackSx } from '../../styles/redeem/VerifyRedemptionStyles';
import { CharityListData } from '../../types/charity';
import { PrimaryDonorData } from '../../types/primaryDonor';

interface Props {
  charity: CharityListData;
  primaryDonor: PrimaryDonorData;
  primaryDonorAmount: number;
  secondaryDonorAmount: number;
}

const VerifyRedemption = ({ charity, primaryDonor, primaryDonorAmount, secondaryDonorAmount }: Props) => {
  return (
    <Stack component="div" sx={stackSx}>
      <Stack margin={2} spacing={1}>
        <Typography variant="h4" sx={headerSx}>
          Choice of Charity
        </Typography>

        <VerifyRedemptionCard imageBaseUrl={charity.logoBase64} text={charity.name} />
      </Stack>

      <Divider />

      <Stack margin={2} spacing={1}>
        <Typography variant="h4" sx={headerSx}>
          Donation Amount
        </Typography>

        <VerifyRedemptionCard
          imageBaseUrl={charity.logoBase64}
          text={`$${primaryDonorAmount} from ${primaryDonor.name}`}
        />

        <VerifyRedemptionCard text={`$${secondaryDonorAmount} from you`} />
      </Stack>
    </Stack>
  );
};

interface VerifyRedemptionCardProps {
  imageBaseUrl?: string;
  text: string;
}

const VerifyRedemptionCard = ({ imageBaseUrl, text }: VerifyRedemptionCardProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        {imageBaseUrl ? <Box sx={imageSx} component="img" src={imageBaseUrl} /> : <PersonIcon sx={iconSx} />}
      </Grid>

      <Grid item xs={10} padding={2}>
        <Typography variant="h4">{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default VerifyRedemption;