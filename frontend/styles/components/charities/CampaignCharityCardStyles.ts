import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const stackSx: SxProps = {
  width: '100%',
  boxShadow: `0px 0px 20px 5px ${theme.palette.neutral.light}`,
  borderRadius: '10px',
  cursor: 'pointer',
  padding: '5px 0',
};

export const charityGraphStackSx: SxProps = {
  width: '90%',
};

export const graphSx: SxProps = {
  height: '0.7em',
  width: '100%',
  '&>div': { border: 'none' },
};

export const charityLogoSx: SxProps = {
  margin: 1,
  maxHeight: '40px',
  minHeight: '40px',
  height: '40px',
  maxWidth: '40px',
  minWidth: '40px',
  width: '40px',
};
