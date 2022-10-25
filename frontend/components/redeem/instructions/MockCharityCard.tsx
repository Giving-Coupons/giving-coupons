import { Box, Stack } from '@mui/system';
import {
  cardSx,
  imageSx,
  longerTextSx,
  shorterTextSx,
  textContainerSx,
} from '../../../styles/components/redeem/MockCharityCardStyles';

const MockCharityCard = () => {
  return (
    <Stack sx={cardSx} component="div" direction="row" spacing={1}>
      <Box sx={imageSx} />

      <Stack sx={textContainerSx} component="div" spacing={1}>
        <Box sx={shorterTextSx} />

        <Box sx={longerTextSx} />
      </Stack>
    </Stack>
  );
};

export default MockCharityCard;
