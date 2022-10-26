import { useField } from 'formik';
import { log } from '../../utils/analytics';
import Button from '../generic/Button';

interface Props {
  name: string;
  value: number;
}

const FormAmountButton = ({ name, value }: Props) => {
  const [, , { setValue }] = useField(name);

  return (
    <Button
      key={value}
      actionType="secondary"
      onClick={() => {
        log('[FormAmountButton] Select', { value });
        setValue(value, true);
      }}
    >
      ${value}
    </Button>
  );
};

export default FormAmountButton;
