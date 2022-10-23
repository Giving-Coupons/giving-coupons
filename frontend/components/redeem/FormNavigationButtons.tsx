import {
  progressButtonContainerSx,
  progressButtonFirstStepContainerSx,
} from '../../styles/components/redeem/RedeemStyles';
import Button from '../generic/Button';
import { Stack } from '@mui/system';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  minStep: number;
  maxStep: number;
  handleClickBack?: () => void;
  handleClickNext?: () => void;
  shouldDisablePrimaryButton?: boolean;
}

const FormNavigationButtons = ({
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
  handleClickNext,
  handleClickBack,
  shouldDisablePrimaryButton,
}: Props) => {
  const isFirstStep = activeStep === minStep;
  const isLastStep = activeStep === maxStep;

  const onClickNext = () => {
    if (shouldDisablePrimaryButton) {
      return;
    }

    if (handleClickNext) {
      handleClickNext();
      return;
    }

    if (activeStep < maxStep) {
      setActiveStep(activeStep + 1);
      return;
    }
  };

  const onClickBack = () => {
    if (handleClickBack) {
      handleClickBack();
      return;
    }

    if (activeStep > minStep) {
      setActiveStep(activeStep - 1);
      return;
    }
  };

  return (
    <Stack
      sx={isFirstStep ? progressButtonFirstStepContainerSx : progressButtonContainerSx}
      component="div"
      direction="row"
    >
      {!isFirstStep && (
        <Button actionType="secondary" onClick={onClickBack}>
          Back
        </Button>
      )}

      {!isLastStep && (
        <Button actionType="primary" onClick={onClickNext} disabled={shouldDisablePrimaryButton}>
          Next
        </Button>
      )}

      {isLastStep && (
        <Button type="submit" actionType="primary" disabled={shouldDisablePrimaryButton}>
          Finish
        </Button>
      )}
    </Stack>
  );
};

export default FormNavigationButtons;
