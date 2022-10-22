import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const gridSx: SxProps = {
  boxShadow: `0px 0px 30px 10px ${theme.palette.neutral.light}`,
  borderRadius: '10px',
};

export const graphSx: SxProps = {
  height: '0.7em',
  width: '100%',
  '&>div': { border: 'none' },
};

export const charityLogoContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const charityLogoSx: SxProps = {
  maxHeight: '40px',
  minHeight: '40px',
  height: '40px',
};
