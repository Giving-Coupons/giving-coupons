import { screenDisplaySx } from '../../../styles/components/redeem/InstructionDialogStyles';
import MockPersonalContribution from './MockPersonalContribution';
import { Stack } from '@mui/system';

const FifthSlideDisplay = () => {
  return (
    <Stack sx={screenDisplaySx} component="div" spacing={1}>
      <MockPersonalContribution />
    </Stack>
  );
};

export default FifthSlideDisplay;
