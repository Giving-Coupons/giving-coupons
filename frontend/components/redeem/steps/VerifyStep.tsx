import { CharityListData } from '../../../types/charity';
import { CouponSponsorship } from '../../../types/primaryDonor';
import Receipt from '../Receipt';
import { Stack } from '@mui/system';
import FormNavigationButtons from '../FormNavigationButtons';
import { Typography } from '@mui/material';
import { formStepContainerSx } from '../../../styles/components/redeem/RedeemStyles';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  charity: CharityListData;
  couponSponsorship?: CouponSponsorship;
  secondaryDonorAmount: number;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  minStep: number;
  maxStep: number;
}

const VerifyStep = ({
  charity,
  couponSponsorship,
  secondaryDonorAmount,
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
}: Props) => {
  return (
    <Stack sx={formStepContainerSx} component="div">
      <Stack component="div" width="100%" spacing={4}>
        <Typography variant="h2" align="center">
          Verify your {couponSponsorship ? 'redemption' : 'contribution'}
        </Typography>

        <Receipt charity={charity} couponSponsorship={couponSponsorship} secondaryDonorAmount={secondaryDonorAmount} />
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
