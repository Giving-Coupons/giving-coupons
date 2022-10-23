import { useField } from 'formik';
import Button from '../generic/Button';

interface Props {
  name: string;
  value: number;
}

const FormAmountButton = ({ name, value }: Props) => {
  const [, , { setValue }] = useField(name);

  return (
    <Button key={value} actionType="secondary" onClick={() => setValue(value, true)}>
      ${value}
    </Button>
  );
};

export default FormAmountButton;
