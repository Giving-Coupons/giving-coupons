import { Form, Formik } from 'formik';
import { CharityFormData } from '../../../types/charity';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import FormTextInput from '../../forms/FormTextInput';
import FormImageUpload from '../../forms/FormImageUpload';
import Button from '../../generic/Button';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  submitButtonTitle: string;
  initialValues: CharityFormData;
  onSubmit: (values: CharityFormData) => void;
}

const CharityForm = ({ title, submitButtonTitle, initialValues, onSubmit }: Props) => {
  const router = useRouter();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isValid, dirty }) => (
        <Form>
          <Stack component="div" spacing={2}>
            <Typography variant="h1">{title}</Typography>

            <FormTextInput name="name" label="Name" placeholder="Enter the charity name" />

            <FormTextInput
              name="description"
              label="Description"
              placeholder="Enter the charity description"
              multiline
              minRows={2}
            />

            <FormTextInput name="websiteUrl" label="Charity Website" placeholder="Enter the charity website" />

            <FormImageUpload name="logoBase64" label="Upload Charity Image" />

            <FormImageUpload name="imageBase64" label="Upload Logo Image" />

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
