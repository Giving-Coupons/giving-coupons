import { CampaignCharityData } from '../../types/campaignCharities';
import Receipt from './Receipt';
import { Stack } from '@mui/system';
import Button from '../generic/Button';
import { PrimaryDonorData } from '../../types/primaryDonor';
import { Typography } from '@mui/material';
import { alreadyRedeemedContainerSx } from '../../styles/components/redeem/RedeemStyles';

interface Props {
  campaignCharity: CampaignCharityData;
  primaryDonor: PrimaryDonorData;
  primaryDonorAmount: number;
  secondaryDonorAmount: number;
}

const AlreadyRedeemedPage = ({ campaignCharity, primaryDonor, primaryDonorAmount, secondaryDonorAmount }: Props) => {
  return (
    <Stack sx={alreadyRedeemedContainerSx} component="div">
      <Stack component="div" spacing={4}>
        <Typography variant="h2" align="center">
          This coupon has been redeemed
        </Typography>

        <Receipt
          charity={campaignCharity.charity}
          primaryDonor={primaryDonor}
          primaryDonorAmount={primaryDonorAmount}
          secondaryDonorAmount={secondaryDonorAmount}
        />
      </Stack>

      <Button actionType="primary">Contribute directly</Button>
    </Stack>
  );
};

export default AlreadyRedeemedPage;
