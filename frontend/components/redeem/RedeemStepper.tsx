import CustomStepper from '../generic/CustomStepper';

interface Props {
  activeStep: number;
}

const RedeemStepper = ({ activeStep }: Props) => {
  return (
    <CustomStepper
      activeStep={activeStep}
      stepLabels={['1. Select a charity', '2. Add a personal contribution', '3. Complete redemption']}
    />
  );
};

export default RedeemStepper;
