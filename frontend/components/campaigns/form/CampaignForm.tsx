import { Form, Formik } from 'formik';
import { Stack } from '@mui/system';
import { InputAdornment, Typography } from '@mui/material';
import { CampaignFormData } from '../../../types/campaigns';
import { containerSx, sectionSx } from '../../../styles/components/campaigns/form/CampaignFormStyles';
import Button from '../../generic/Button';
import CampaignFormCharitiesSection from './CampaignFormCharitiesSection';
import FormDatePicker from '../../forms/FormDatePicker';
import FormTextInput from '../../forms/FormTextInput';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import FormImageUpload from '../../forms/FormImageUpload';

interface Props {
  title: string;
  submitButtonTitle: string;
  isForEditCampaign: boolean;
  initialValues: CampaignFormData;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: CampaignFormData) => void;
}

export const campaignDefaultInitialValues = {
  start: null,
  end: null,
  couponDenomination: 10,
  interestId: null,
  charities: [{}],
};

const CampaignForm = ({
  title,
  submitButtonTitle,
  isForEditCampaign,
  initialValues,
  validationSchema,
  onSubmit,
}: Props) => {
  const router = useRouter();

  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, isValid, dirty }) => (
        <Form>
          <Stack sx={containerSx} component="div" spacing={2}>
            <Typography variant="h1">{title}</Typography>

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Campaign Info</Typography>

              <FormTextInput name="name" label="Name" placeholder="Enter the campaign name" />

              <FormTextInput
                name="description"
                label="Description"
                placeholder="Enter the campaign description"
                multiline
                minRows={2}
              />

              {!isForEditCampaign && (
                <>
                  <FormTextInput
                    name="promisedAmount"
                    label="Promised Amount"
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />

                  <FormTextInput
                    name="couponDenomination"
                    label="Coupon Denomination"
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </>
              )}

              <FormDatePicker name="start" label="Start Date" />

              <FormDatePicker name="end" label="End Date" />

              <FormImageUpload name="imageBase64" label="Upload Image" />
            </Stack>

            <CampaignFormCharitiesSection values={values.charities} />

            <Stack sx={sectionSx} component="div" spacing={2}>
              <Typography variant="h3">Primary Donor Info</Typography>

              <FormTextInput name="primaryDonor.name" label="Name" placeholder="Enter the primary donor name" />

              <FormTextInput name="primaryDonor.email" label="Email" placeholder="Enter the primary donor email" />
            </Stack>

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

export default CampaignForm;
