import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const rootSx: SxProps = {
  padding: theme.spacing(2),
};

export const headerSx: SxProps = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const logoSx: SxProps = {
  width: 30,
  height: 30,
  objectFit: 'contain',
};
