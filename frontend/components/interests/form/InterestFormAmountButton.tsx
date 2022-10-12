import { Button } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { amountButtonSx } from '../../../styles/interest';
import { InterestFormData } from './InterestForm';

interface Props {
  name: keyof InterestFormData;
  value: number;
}

const InterestFormAmountButton = ({ name, value }: Props) => {
  const [, , { setValue }] = useField(name);

  return (
    <Button key={value} variant="outlined" sx={amountButtonSx} onClick={() => setValue(value, true)}>
      ${value}
    </Button>
  );
};

export default InterestFormAmountButton;
