import { Box, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Typography } from '@mui/material';
import {
  charityLogoSx,
  givingSgLogoSx,
  lineSx,
  redirectAcknowledgementContainerSx,
  redirectAmountSx,
  redirectLineContainerSx,
} from '../../styles/components/redeem/RedeemStyles';
import { Stack, useTheme } from '@mui/system';
import { CampaignCharityData } from '../../types/campaignCharities';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Button from '../generic/Button';
import LockIcon from '@mui/icons-material/Lock';
import { CouponRedirectFormData } from '../../types/coupons';

interface Props {
  open: boolean;
  handleClose: () => void;
  primaryDonorName: string;
  couponDenomination: number;
  campaignCharity: CampaignCharityData;
  secondaryDonationAmount: number;
  goToNextStep: () => void;
}

const validationSchema = Yup.object().shape({
  hasAcknowledged: Yup.boolean().oneOf([true], 'Please acknowledge the message'),
});

const RedirectDialog = ({
  open,
  handleClose,
  primaryDonorName,
  couponDenomination,
  secondaryDonationAmount,
  campaignCharity,
  goToNextStep,
}: Props) => {
  const theme = useTheme();
  const handleRedirect = (values: CouponRedirectFormData) => {
    validationSchema.validate(values).then(() => {
      window.open(campaignCharity.givingSgUrl, '_blank');
      goToNextStep();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography component="div" variant="h1" align="center">
          Proceed to <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" /> to pay?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{ hasAcknowledged: false }}
          validationSchema={validationSchema}
          onSubmit={handleRedirect}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <Stack component="div" alignItems="center" spacing={4}>
                <Stack component="div" alignItems="center" width="100%">
                  <Typography variant="h5">You are donating</Typography>

                  <Typography sx={redirectAmountSx}>${secondaryDonationAmount}</Typography>

                  <Stack sx={redirectLineContainerSx} component="div" direction="row">
                    <Box sx={lineSx} />

                    <Typography variant="caption" color={theme.palette.grey[700]}>
                      To
                    </Typography>

                    <Box sx={lineSx} />
                  </Stack>

                  <Stack component="div" direction="row" spacing={2} alignItems="center">
                    <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

                    <Typography variant="h4">{campaignCharity.charity.name}</Typography>
                  </Stack>
                </Stack>

                <Stack component="div" alignItems="center" width="100%" spacing={2}>
                  <Stack component="div" sx={redirectAcknowledgementContainerSx}>
                    <Typography align="center">
                      {primaryDonorName}&apos;s ${couponDenomination} will not be redeemed until you return, so please
                      come back afterwards!
                    </Typography>

                    <FormControlLabel
                      name="hasAcknowledged"
                      control={<Checkbox onChange={(e) => setFieldValue('hasAcknowledged', e.target.checked)} />}
                      label="I acknowledge"
                      checked={values.hasAcknowledged}
                    />

                    {errors.hasAcknowledged && (
                      <Typography color="error" variant="caption">
                        {errors.hasAcknowledged}
                      </Typography>
                    )}
                  </Stack>

                  <Button type="submit" actionType="primary" startIcon={<LockIcon />} fullWidth>
                    Pay through giving.sg
                  </Button>

                  <Button actionType="muted" onClick={handleClose} fullWidth>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RedirectDialog;
