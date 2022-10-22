import { CharityListData } from '../../types/charity';
import { PrimaryDonorData } from '../../types/primaryDonor';
import VerifyRedemption from './VerifyRedemption';
import { Stack } from '@mui/system';
import RedeemFormButtons from './RedeemFormButtons';

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
    <Stack component="div" spacing={4} width="100%" alignItems="center">
      <VerifyRedemption
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
