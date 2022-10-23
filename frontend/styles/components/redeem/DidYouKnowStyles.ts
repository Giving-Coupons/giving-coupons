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

export const boxSx: SxProps = {
  marginTop: 1.5,
  padding: 1.5,
  borderRadius,
  width: '100%',
  background: 'linear-gradient(150.91deg, rgba(255, 153, 0, 0.56375) -28.09%, rgba(184, 34, 221, 0.8) 109.59%);',
  div: { width: '100%' },
};

export const textSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80px',
  color: 'white',
  fontWeight: 500,
  textAlign: 'center',
};
