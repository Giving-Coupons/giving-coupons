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
    <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={10}>
      <Grid item xs={12} sm={6} md={4} container paddingLeft={2} paddingRight={2}>
        <Grid item>
          <CampaignCharityCard campaignCharity={makeMockCampaignCharity(1)} />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={8}>
        <Stack spacing={theme.spacing(2)} padding={2}>
          <Typography textAlign="center">
            You have empowered {coupon.campaign.name} and their beneficiary with ${coupon.campaign.couponDenomination}.
          </Typography>

          <Typography variant="h4" textAlign="center">
            Would you like to add a personal contribution?
          </Typography>

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
                </Stack>
              </Form>
            )}
          </Formik>

          <Button fullWidth actionType="secondary" onClick={handleSubmit}>
            Continue without a personal contribution
          </Button>

          <Button fullWidth actionType="tertiary" onClick={goToPreviousPage}>
            Change beneficiary
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PersonalContribution;
