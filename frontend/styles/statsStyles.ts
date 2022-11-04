import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';

export const rootSx: SxProps = {
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'space-around',
  alignItems: 'center',
  textAlign: 'center',
};
