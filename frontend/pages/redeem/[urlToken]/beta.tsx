import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { isString } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Nullable } from '../../../types/utils';
import useRedemptionState from '../../../hooks/useRedemptionState';
import { RedemptionStep, RedemptionStepData } from '../../../types/redemptionState';
import { getRedemptionStateCookie } from '../../../utils/redemptionState';
import Button from '../../../components/generic/Button';

const steps: { label: string; stepOnCompletion?: RedemptionStepData }[] = [
  { label: 'View instruction', stepOnCompletion: { step: RedemptionStep.InstructionsCompleted } },
  { label: 'Select Charity', stepOnCompletion: { step: RedemptionStep.CharitySelected, charityId: 1 } },
  {
    label: 'Select Amount',
    stepOnCompletion: { step: RedemptionStep.AmountSelected, charityId: 1, personalContribution: 20 },
  },
  {
    label: 'Make Personal Contribution',
    stepOnCompletion: { step: RedemptionStep.PersonalContributionMade, charityId: 1, personalContribution: 20 },
  },
  {
    label: 'Verify Redemption',
    stepOnCompletion: { step: RedemptionStep.RedemptionVerified, charityId: 1, personalContribution: 20 },
  },
  { label: 'Completed' },
];

function getStepIndex(step: Nullable<RedemptionStep>) {
  switch (step) {
    case null:
      // Disable stepper.
      return -1;
    case RedemptionStep.Initial:
      return 0;
    case RedemptionStep.InstructionsCompleted:
      return 1;
    case RedemptionStep.CharitySelected:
      return 2;
    case RedemptionStep.AmountSelected:
      return 3;
    case RedemptionStep.PersonalContributionMade:
      return 4;
    case RedemptionStep.RedemptionVerified:
      return 5;
    default:
      console.log('wtf');
      throw new Error(step);
  }
}

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && isString(router.query.urlToken) ? router.query.urlToken : null;
  const [redemptionState, updateRedemptionStep] = useRedemptionState(urlToken);

  return (
    <Box sx={{ maxWidth: 400, margin: '2rem' }}>
      <Typography variant="h1">Stepper:</Typography>
      <Stepper activeStep={getStepIndex(redemptionState?.lastCompleted?.step ?? null)}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Button
        sx={{ marginBottom: '2rem', marginTop: '2rem' }}
        actionType="primary"
        onClick={() => {
          const stepIndex = getStepIndex(redemptionState?.lastCompleted?.step ?? null);
          const step = steps[Math.max(0, stepIndex)];
          step.stepOnCompletion && updateRedemptionStep(step.stepOnCompletion);
        }}
      >
        Next
      </Button>

      <Typography variant="h2">Cookie:</Typography>
      {JSON.stringify(getRedemptionStateCookie(), null, '. . ')
        .split('\n')
        .map((k, i) => (
          <p key={i}>{k}</p>
        ))}
      <br />
    </Box>
  );
};

export default Redeem;
