import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { amountButtonSx } from '../../../styles/interest';
import { InterestFormData } from './InterestForm';

interface Props {
  name: keyof InterestFormData;
  value: number;
}

const InterestFormAmountButton = ({ name, value }: Props) => {
  const { setFieldValue } = useFormikContext<InterestFormData>();

  return (
    <Button key={value} variant="outlined" sx={amountButtonSx} onClick={() => setFieldValue(name, value, true)}>
      ${value}
    </Button>
  );
};

export default InterestFormAmountButton;
