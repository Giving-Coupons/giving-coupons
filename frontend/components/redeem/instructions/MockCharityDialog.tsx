import { Box, Stack } from '@mui/system';
import {
  cardSx,
  imageSx,
  logoSx,
  longerTextSx,
  shorterTextSx,
} from '../../../styles/components/redeem/MockCharityDialogStyles';

const MockCharityDialog = () => {
  return (
    <Stack sx={cardSx} component="div" spacing={1}>
      <Stack component="div" direction="row" spacing={1} alignItems="center">
        <Box sx={logoSx} />

        <Box sx={shorterTextSx} />
      </Stack>

      <Box sx={imageSx} />

      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Box key={item} sx={longerTextSx} />
      ))}
    </Stack>
  );
};

export default MockCharityDialog;
