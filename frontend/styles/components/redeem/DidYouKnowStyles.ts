import { SxProps } from '@mui/material';
import { theme } from '../../../utils/theme';

const borderRadius = '20px';

export const stackSx: SxProps = {
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  padding: 2,
  borderRadius,
  alignItems: 'center',
  width: '90%',
};
