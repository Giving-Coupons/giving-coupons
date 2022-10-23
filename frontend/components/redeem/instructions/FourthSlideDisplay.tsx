import { screenDisplaySx } from '../../../styles/components/redeem/InstructionDialogStyles';
import MockCharityDialog from './MockCharityDialog';
import { Stack } from '@mui/system';

const FourthSlideDisplay = () => {
  return (
    <Stack sx={screenDisplaySx} component="div" spacing={1}>
      <MockCharityDialog />
    </Stack>
  );
};

export default FourthSlideDisplay;
