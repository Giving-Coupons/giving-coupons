import { Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeMockCampaignCharity } from '../../pages/campaigns/mock';
import { containerSx } from '../../styles/redeem/indexStyles';
import { CouponRedeemData } from '../../types/coupons';
import { theme } from '../../utils/theme';
import CampaignCharityCard from '../charities/CampaignCharityCard';
import FormTextInput from '../forms/FormTextInput';
import Button from '../generic/Button';

const couponRedeemFormSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required.')
    .typeError('Amount must be a number.')
    .integer('Amount must be an integer.')
    .positive('Amount must be a positive.'),
});

type Props = {
  coupon: CouponRedeemData;
  setAmount: (amount: number) => void;
  goToPreviousPage: () => void;
  handleSubmit: () => void;
};

const PersonalContribution = ({ coupon, setAmount, goToPreviousPage, handleSubmit }: Props) => {
  return (
    <Grid container sx={containerSx} component="main" justifyContent="center">
      <Grid item xs={12} sm={7} md={4} padding={4}>
        <CampaignCharityCard campaignCharity={makeMockCampaignCharity(1)} />
      </Grid>

      <Grid item xs={12} sm={5} md={8} padding={4}>
        <Stack spacing={theme.spacing(2)}>
          <Typography textAlign="center">
            <strong>You have empowered {coupon.campaign.name}</strong> and their beneficiary with{' '}
            <strong>${coupon.campaign.couponDenomination}</strong>.
          </Typography>

          <Typography textAlign="center">Would you like to add a personal contribution?</Typography>

          <Formik
            initialValues={{ amount: 0 }}
            validationSchema={couponRedeemFormSchema}
            onSubmit={(values: { amount: number }) =>
              couponRedeemFormSchema.validate(values).then(() => setAmount(values.amount))
            }
          >
            {({ isValid, dirty }) => (
              <Form>
                <Stack spacing={theme.spacing(2)}>
                  <FormTextInput
                    name="amount"
                    label="Amount"
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />

                  <Button
                    type="submit"
                    disabled={!isValid || !dirty}
                    fullWidth
                    actionType="primary"
                    onClick={handleSubmit}
                  >
                    Make a personal contribution
                  </Button>

                  <Button fullWidth actionType="secondary" onClick={handleSubmit}>
                    Continue without a personal contribution
                  </Button>

                  <Button fullWidth actionType="tertiary" onClick={goToPreviousPage}>
                    Change beneficiary
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PersonalContribution;
