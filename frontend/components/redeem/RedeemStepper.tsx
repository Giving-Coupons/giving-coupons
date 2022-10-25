import { RedemptionState, RedemptionStep } from '../../types/redemptionState';
import { Nullable } from '../../types/utils';
import CustomStepper from '../generic/CustomStepper';

interface Props {
  redemptionState: Nullable<RedemptionState>;
}

const RedeemStepper = ({ redemptionState }: Props) => {
  return (
    <CustomStepper
      activeStep={getActiveStep(redemptionState)}
      stepLabels={['1. Select a charity', '2. Add a personal contribution', '3. Complete redemption']}
    />
  );
};

// Note: Do not inline this function.
// Explicitly declaring a typed function ensures switch case type-safety with the enum values of RedemptionStep.
const getActiveStep = (redemptionState: Nullable<RedemptionState>): number => {
  switch (redemptionState?.current) {
    case undefined:
    // Fallthrough.
    case RedemptionStep.SELECT_CHARITY:
      return 0;
    case RedemptionStep.SELECT_AMOUNT:
      return 1;
    case RedemptionStep.VERIFY_REDEMPTION:
      return 2;
  }
};

export default RedeemStepper;
