import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { CharityFormData } from '../../../types/charity';
import FormImageUpload from '../../forms/FormImageUpload';
import FormTextInput from '../../forms/FormTextInput';
import Button from '../../generic/Button';

interface Props {
  title: string;
  submitButtonTitle: string;
  initialValues: CharityFormData;
  onSubmit: (values: CharityFormData) => void;
}

export const charitySchema = Yup.object().shape({
  name: Yup.string().required('Charity name is required.'),
  description: Yup.string().required('Charity description is required.'),
  websiteUrl: Yup.string()
    .required('Charity website url is required')
    .url('A valid url including http:// or https:// is required'),
  logoUrl: Yup.string().required('Charity logo is required'),
  imageUrl: Yup.string().required('Charity image is required'),
});

const CharityForm = ({ title, submitButtonTitle, initialValues, onSubmit }: Props) => {
  const router = useRouter();

  return (
    <Formik initialValues={initialValues} validationSchema={charitySchema} onSubmit={onSubmit}>
      {({ isValid, dirty }) => (
        <Form>
          <Stack component="div" spacing={2}>
            <Typography variant="h1">{title}</Typography>

            <FormTextInput name="name" label="Name" placeholder="Enter the charity name" disableAutocomplete />

            <FormTextInput
              name="description"
              label="Description"
              placeholder="Enter the charity description"
              multiline
              minRows={2}
            />

            <FormTextInput name="websiteUrl" label="Charity Website" placeholder="Enter the charity website" />

            <FormImageUpload name="imageUrl" label="Upload Charity Image" />

            <FormImageUpload name="logoUrl" label="Upload Logo Image" />

            <Button type="submit" disabled={!isValid || !dirty} actionType="primary" fullWidth>
              {submitButtonTitle}
            </Button>

            <Button actionType="muted" fullWidth onClick={() => router.back()}>
              Cancel
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CharityForm;
