import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'row',
};

export const mobileSearchButtonSx: SxProps = {
  position: 'fixed',
  right: '1em',
  bottom: '1em',
  backgroundColor: theme.palette.secondaryTranslucent.light,
  '&:hover': {
    backgroundColor: theme.palette.secondaryTranslucent.main,
  },
};
