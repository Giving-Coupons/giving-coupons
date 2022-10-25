import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';
import { Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper } from '@mui/material';
import { styled } from '@mui/system';

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
    color: 'white',
    display: 'flex',
    borderRadius: '50%',
    padding: '2px',
    ...(ownerState.active && {
      backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    }),
    ...(ownerState.completed && {
      backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    }),
  }));

  return <StepIconRoot ownerState={{ completed, active }}>{completed ? <CheckIcon /> : <CircleIcon />}</StepIconRoot>;
};

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 'none',
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
