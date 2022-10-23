import {
  couponAmountSx,
  couponReceivedLineContainerSx,
  lineSx,
  screenDisplaySx,
} from '../../../styles/components/redeem/InstructionDialogStyles';
import { Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import MockCharityCard from './MockCharityCard';
import { givingSgLogoSx } from '../../../styles/components/redeem/RedeemStyles';

interface Props {
  couponDenomination: number;
}

const ThirdSlideDisplay = ({ couponDenomination }: Props) => {
  const theme = useTheme();

  return (
    <Stack sx={screenDisplaySx} component="div" spacing={1}>
      <Typography>Bob will pay</Typography>

      <Typography sx={couponAmountSx}>${couponDenomination}</Typography>

      <Stack sx={couponReceivedLineContainerSx} component="div" direction="row">
        <Box sx={lineSx} />

        <Typography variant="caption" color={theme.palette.grey[700]}>
          To
        </Typography>

        <Box sx={lineSx} />
      </Stack>

      <Stack component="div" alignItems="center" spacing={1} width="100%">
        <MockCharityCard />

        <Typography variant="caption" align="center">
          through <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ThirdSlideDisplay;
