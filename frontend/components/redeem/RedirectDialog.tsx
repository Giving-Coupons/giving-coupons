import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  charityLogoSx,
  givingSgLogoSx,
  lineSx,
  redirectAcknowledgementContainerSx,
  redirectAmountSx,
  redirectLineContainerSx,
} from '../../styles/components/redeem/RedeemStyles';
import { CampaignCharityData } from '../../types/campaignCharities';
import { CouponRedirectFormData } from '../../types/coupons';
import { CouponSponsorship } from '../../types/primaryDonor';
import { log } from '../../utils/analytics';
import Button from '../generic/Button';
import IconButtonWithTooltip from '../IconButtonWithTooltip';

interface Props {
  open: boolean;
  handleClose: () => void;
  couponSponsorship?: CouponSponsorship;
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
  couponSponsorship,
  secondaryDonationAmount,
  campaignCharity,
  goToNextStep,
}: Props) => {
  const theme = useTheme();
  const [shouldShowLearnMore, setShouldShowLearnMore] = useState<boolean>(false);

  const handleRedirect = (values: CouponRedirectFormData) => {
    log('[RedirectDialog] Redirect to Giving.sg', {
      campaignCharityId: campaignCharity.id,
      couponId: couponSponsorship?.couponId,
      amount: secondaryDonationAmount,
    });

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
                      {couponSponsorship
                        ? `We will not be able to transfer ${couponSponsorship.primaryDonor.name}'s $${couponSponsorship.couponDenomination} to ${campaignCharity.charity.name} unless you return and verify your donation.`
                        : 'Your contribution will not be counted towards this campaign unless you return and verify your donation.'}

                      {couponSponsorship && (
                        <IconButtonWithTooltip
                          tooltip="Learn More"
                          size="small"
                          icon={<InfoIcon fontSize="small" />}
                          onClick={() => setShouldShowLearnMore((prev) => !prev)}
                        />
                      )}
                    </Typography>

                    {shouldShowLearnMore && couponSponsorship && (
                      <Typography align="center" variant="subtitle2">
                        Donations made through <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />{' '}
                        cannot be tracked by us. We strongly encourage you to verify your redemption by returning to
                        back to this link after donating.{' '}
                        <strong>
                          We will only transfer {couponSponsorship.primaryDonor.name}
                          &apos;s ${couponSponsorship.couponDenomination} to {campaignCharity.charity.name} after you
                          have verified your donation.
                        </strong>
                      </Typography>
                    )}

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

                  <Button
                    type="submit"
                    disabled={!isValid || !dirty}
                    actionType="primary"
                    startIcon={<LockIcon />}
                    fullWidth
                  >
                    Pay through giving.sg
                  </Button>

                  <Button
                    actionType="muted"
                    onClick={() => {
                      log('[RedirectDialog] Click cancel');
                      handleClose();
                    }}
                    fullWidth
                  >
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
