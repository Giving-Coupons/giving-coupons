import { useField } from 'formik';
import { InterestFormData } from './InterestForm';
import Button from '../../generic/Button';

interface Props {
  name: keyof InterestFormData;
  value: number;
}

const InterestFormAmountButton = ({ name, value }: Props) => {
  const [, , { setValue }] = useField(name);

  return (
    <Button key={value} actionType="secondary" onClick={() => setValue(value, true)}>
      ${value}
    </Button>
  );
};

export default InterestFormAmountButton;
