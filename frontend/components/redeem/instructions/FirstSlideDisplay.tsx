import { Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import {
  couponAmountSx,
  couponReceivedLineContainerSx,
  lineSx,
  primaryDonorImageSx,
} from '../../../styles/components/redeem/InstructionDialogStyles';
import { PrimaryDonorData } from '../../../types/primaryDonor';

interface Props {
  couponDenomination: number;
  primaryDonor: PrimaryDonorData;
}

const FirstSlideDisplay = ({ couponDenomination, primaryDonor }: Props) => {
  const theme = useTheme();

  return (
    <>
      <Typography>You have received</Typography>

      <Typography sx={couponAmountSx}>${couponDenomination}</Typography>

      <Stack sx={couponReceivedLineContainerSx} component="div" direction="row">
        <Box sx={lineSx} />

        <Typography variant="caption" color={theme.palette.grey[700]}>
          From
        </Typography>

        <Box sx={lineSx} />
      </Stack>

      <Stack component="div" direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Box sx={primaryDonorImageSx} component="img" src={primaryDonor.imageUrl} />

        <Typography variant="h4">{primaryDonor.name}</Typography>
      </Stack>
    </>
  );
};

export default FirstSlideDisplay;
