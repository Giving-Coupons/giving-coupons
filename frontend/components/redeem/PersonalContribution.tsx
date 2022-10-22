import { Stack, useTheme } from '@mui/system';
import {
  charityLogoSx,
  desktopFormContainerSx,
  givingSgLogoSx,
  mobileFormContainerSx,
} from '../../styles/components/redeem/RedeemStyles';
import { Box, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import RedeemFormButtons from './RedeemFormButtons';
import { CampaignCharityData } from '../../types/campaignCharities';
import FormTextInput from '../forms/FormTextInput';
import FormAmountButton from '../forms/FormAmountButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButtonWithTooltip from '../IconButtonWithTooltip';
import DidYouKnow from './DidYouKnow';
import { useField } from 'formik';

type Props = {
  primaryDonorName: string;
  couponDenomination: number;
  campaignCharity: CampaignCharityData;
  activeStep: number;
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  minStep: number;
  maxStep: number;
};

const PersonalContribution = ({
  primaryDonorName,
  couponDenomination,
  campaignCharity,
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fieldName = 'amount';
  const [, , { setValue }] = useField(fieldName);

  return (
    <Stack component="div" sx={isMobile ? mobileFormContainerSx : desktopFormContainerSx} spacing={4}>
      <Typography variant="h2" align="center">
        {primaryDonorName} will be giving ${couponDenomination} to
      </Typography>

      <Stack component="div" direction="row" spacing={2} alignItems="center">
        <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

        <Typography variant="h4">{campaignCharity.charity.name}</Typography>
      </Stack>

      <Stack component="div" alignItems="center" spacing={1}>
        <Typography variant="h2" align="center">
          Do you want to add a personal contribution too?
        </Typography>

        <Typography variant="body2" align="center">
          Your donation will be securely transferred through{' '}
          <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />
        </Typography>
      </Stack>

      <Stack component="div" alignItems="center">
        <FormTextInput
          name={fieldName}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButtonWithTooltip
                  icon={<HighlightOffIcon color={theme.palette.neutral.light} />}
                  tooltip="Clear"
                  onClick={() => setValue(null)}
                />
              </InputAdornment>
            ),
          }}
        />

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

      <RedeemFormButtons activeStep={activeStep} setActiveStep={setActiveStep} minStep={minStep} maxStep={maxStep} />
    </Stack>
  );
};

export default PersonalContribution;
