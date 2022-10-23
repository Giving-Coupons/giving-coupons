import { CharityListData } from '../../../types/charity';
import { PrimaryDonorData } from '../../../types/primaryDonor';
import Receipt from '../Receipt';
import { Stack } from '@mui/system';
import FormNavigationButtons from '../FormNavigationButtons';
import { Typography } from '@mui/material';
import { formStepContainerSx } from '../../../styles/components/redeem/RedeemStyles';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  charity: CharityListData;
  primaryDonor: PrimaryDonorData;
  primaryDonorAmount: number;
  secondaryDonorAmount: number;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
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
    <Stack sx={formStepContainerSx} component="div" spacing={2}>
      <Stack component="div" width="100%" spacing={4}>
        <Typography variant="h2" align="center">
          Verify your redemption
        </Typography>

        <Receipt
          charity={charity}
          primaryDonor={primaryDonor}
          primaryDonorAmount={primaryDonorAmount}
          secondaryDonorAmount={secondaryDonorAmount}
        />
      </Stack>

      <FormNavigationButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        minStep={minStep}
        maxStep={maxStep}
      />
    </Stack>
  );
};

export default VerifyStep;
