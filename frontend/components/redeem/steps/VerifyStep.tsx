import { CharityListData } from '../../../types/charity';
import { PrimaryDonorData } from '../../../types/primaryDonor';
import Receipt from '../Receipt';
import { Stack } from '@mui/system';
import RedeemFormButtons from '../RedeemFormButtons';
import { Typography } from '@mui/material';
import { formPageContainerSx } from '../../../styles/components/redeem/RedeemStyles';

interface Props {
  charity: CharityListData;
  primaryDonor: PrimaryDonorData;
  primaryDonorAmount: number;
  secondaryDonorAmount: number;
  activeStep: number;
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  minStep: number;
  maxStep: number;
}

const VerifyStep = ({
  charity,
  primaryDonor,
  primaryDonorAmount,
  secondaryDonorAmount,
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
}: Props) => {
  return (
    <Stack sx={formPageContainerSx} component="div">
      <Typography variant="h2" align="center">
        Verify your redemption
      </Typography>

      <Receipt
        charity={charity}
        primaryDonor={primaryDonor}
        primaryDonorAmount={primaryDonorAmount}
        secondaryDonorAmount={secondaryDonorAmount}
      />

      <RedeemFormButtons activeStep={activeStep} setActiveStep={setActiveStep} minStep={minStep} maxStep={maxStep} />
    </Stack>
  );
};

export default VerifyStep;
