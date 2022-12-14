import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, InputAdornment, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useField } from 'formik';
import { useState } from 'react';
import {
  charityLogoSx,
  emojiSx,
  formStepContainerSx,
  givingSgLogoSx,
} from '../../../styles/components/redeem/RedeemStyles';
import { CampaignCharityData } from '../../../types/campaignCharities';
import { CouponSponsorship } from '../../../types/primaryDonor';
import { Nullable } from '../../../types/utils';
import FormAmountButton from '../../forms/FormAmountButton';
import FormTextInput from '../../forms/FormTextInput';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';
import DidYouKnow from '../DidYouKnow';
import FormNavigationButtons from '../FormNavigationButtons';
import RedirectDialog from '../RedirectDialog';

type Props = {
  couponSponsorship?: CouponSponsorship;
  campaignCharity: CampaignCharityData;
  activeStep: number;
  setActiveStep: (step: number) => void;
  minStep: number;
  maxStep: number;
};

const getEmoji = (amount: Nullable<number>) => {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount < 10) {
    return '🥺';
  } else if (numericAmount < 15) {
    return '😊';
  } else if (numericAmount < 20) {
    return '🥰';
  } else if (numericAmount < 25) {
    return '😍';
  } else {
    return '🤩';
  }
};

const PersonalContributionStep = ({
  couponSponsorship,
  campaignCharity,
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
}: Props) => {
  const fieldName = 'amount';
  const [, { value, error }, { setValue }] = useField<Nullable<number>>(fieldName);
  const [openRedirectDialog, setOpenRedirectDialog] = useState<boolean>(false);

  return (
    <Stack sx={formStepContainerSx} component="div" spacing={2}>
      <Stack spacing={4} width="100%" alignItems="center">
        <Typography variant="h2" align="center">
          {couponSponsorship
            ? `${couponSponsorship.primaryDonor.name} will be giving $${couponSponsorship.couponDenomination} to`
            : 'You have chosen to contribute to'}
        </Typography>

        <Stack component="div" direction="row" spacing={2} alignItems="center">
          <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoUrl} />

          <Typography variant="h4">{campaignCharity.charity.name}</Typography>
        </Stack>

        <Stack component="div" alignItems="center" spacing={1}>
          <Typography variant="h2" align="center">
            {couponSponsorship ? 'Do you want to add a personal contribution too?' : 'How much would you like to give?'}
          </Typography>

          <Typography variant="body2" align="center">
            Your donation will be securely transferred through{' '}
            <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />
          </Typography>
        </Stack>

        <Stack component="div" alignItems="center">
          <Stack component="div" direction="row" spacing={2}>
            <FormTextInput
              name={fieldName}
              label="Amount"
              placeholder="0"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButtonWithTooltip icon={<HighlightOffIcon />} tooltip="Clear" onClick={() => setValue(null)} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="h1" sx={emojiSx}>
              {getEmoji(value)}
            </Typography>
          </Stack>

          <Stack component="div" spacing={1}>
            <Typography variant="caption">Can&apos;t decide? Choose an amount:</Typography>

            <Stack component="div" direction="row" spacing={2}>
              {[10, 15, 20, 25].map((value) => (
                <FormAmountButton name={fieldName} value={value} key={value} />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <DidYouKnow />
      </Stack>

      <FormNavigationButtons
        activeStep={activeStep}
        shouldDisablePrimaryButton={!!error}
        setActiveStep={setActiveStep}
        minStep={minStep}
        maxStep={maxStep}
        handleClickNext={() => ((value || null) === null ? setActiveStep(activeStep + 1) : setOpenRedirectDialog(true))}
      />

      <RedirectDialog
        open={openRedirectDialog}
        handleClose={() => setOpenRedirectDialog(false)}
        couponSponsorship={couponSponsorship}
        secondaryDonationAmount={value ?? 0}
        campaignCharity={campaignCharity}
        goToNextStep={() => setActiveStep(activeStep + 1)}
      />
    </Stack>
  );
};

export default PersonalContributionStep;
