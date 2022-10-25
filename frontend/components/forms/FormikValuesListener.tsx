import { FormikValues, useFormikContext } from 'formik';
import { useEffect } from 'react';

interface Props<T extends FormikValues> {
  handleChange: (values: T) => void;
}

// Note: useFormikContext must be in a child of a Formik component to work. Hence, it must be a JSX.Element.
const FormikValuesListener = <T extends FormikValues>({ handleChange }: Props<T>) => {
  const { values } = useFormikContext<T>() ?? {};

  useEffect(() => {
    if (values !== undefined) {
      handleChange(values);
    }
  }, [values]);

  return <></>;
};

export default FormikValuesListener;
