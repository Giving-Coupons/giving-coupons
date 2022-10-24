import CustomStepper from '../../generic/CustomStepper';

interface Props {
  activeStep: number;
}

const ContributeStepper = ({ activeStep }: Props) => {
  return (
    <CustomStepper
      activeStep={activeStep}
      stepLabels={['1. Select a charity', '2. Specify an amount', '3. Complete contribution']}
    />
  );
};

export default ContributeStepper;
