import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  padding: '32px 0',
};

export const messageContainerSx: SxProps = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '8px',
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
