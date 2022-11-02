import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import moment, { Moment } from 'moment';
import * as Yup from 'yup';
import { CouponRegenerationFormData } from '../../../types/campaigns';
import FormDatePicker from '../../forms/FormDatePicker';
import Button from '../../generic/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CouponRegenerationFormData) => void;
  campaignStartDate: Moment;
  campaignEndDate: Moment;
};

export default function CouponRegenerationFormDialog({
  isOpen,
  onClose,
  onSubmit,
  campaignStartDate,
  campaignEndDate,
}: Props) {
  const minDate = moment.max(moment().startOf('day'), campaignStartDate);
  const maxDate = campaignEndDate.endOf('day');

  const validationSchema = Yup.object().shape({
    expiryDate: Yup.date()
      .required('Expiry date is required.')
      .typeError('Expiry date must be a date.')
      .min(minDate, 'Expiry date cannot be in the past.')
      .max(maxDate, 'Expiry date cannot be after campaign end date.'),
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Formik
        initialValues={{ expiryDate: moment().endOf('day') }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <Form>
            <DialogTitle>
              <Typography variant="h1">Regenerate expired coupons</Typography>
            </DialogTitle>

            <DialogContent>
              <Stack spacing={2}>
                <DialogContentText>
                  Please input the new expiry date for the coupons you wish to regenerate.
                </DialogContentText>
                <FormDatePicker name={'expiryDate'} label={'New Expiry Date'} minDate={minDate} maxDate={maxDate} />
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button actionType="muted" onClick={onClose}>
                Cancel
              </Button>

              <Button actionType="primary" type="submit" disabled={!isValid}>
                Confirm
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
