import { Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper } from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';

interface Props {
  activeStep?: number;
  stepLabels: string[];
}

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  const StepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.neutral.light,
    zIndex: 1,
    color: '#FFFFFF',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    ...(ownerState.active && {
      backgroundColor: theme.palette.primary.main,
    }),
    ...(ownerState.completed && {
      backgroundColor: theme.palette.primary.main,
    }),
  }));

  return <StepIconRoot ownerState={{ completed, active }}>{completed ? <CheckIcon /> : <CircleIcon />}</StepIconRoot>;
};

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.neutral.light,
  },
}));

const CustomStepper = ({ activeStep, stepLabels }: Props) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
      {stepLabels.map((label, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
