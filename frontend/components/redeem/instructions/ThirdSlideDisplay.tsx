import { Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import {
  couponAmountSx,
  couponReceivedLineContainerSx,
  lineSx,
} from '../../../styles/components/redeem/InstructionDialogStyles';
import { givingSgLogoSx } from '../../../styles/components/redeem/RedeemStyles';
import MockCharityCard from './MockCharityCard';

interface Props {
  couponDenomination: number;
}

const ThirdSlideDisplay = ({ couponDenomination }: Props) => {
  const theme = useTheme();

  return (
    <>
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
    </>
  );
};

export default ThirdSlideDisplay;
