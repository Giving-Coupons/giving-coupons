import { Button } from '@mui/material';
import { amountButtonSx } from '../../../styles/interest';
import { InterestFormData } from './InterestForm';

interface Props {
  name: keyof InterestFormData;
  value: number;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const InterestFormAmountButton = ({ name, value, setFieldValue }: Props) => {
  return (
    <Button key={value} variant="outlined" sx={amountButtonSx} onClick={() => setFieldValue(name, value, true)}>
      ${value}
    </Button>
  );
};

export default InterestFormAmountButton;
