import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const gridSx: SxProps = {
  boxShadow: `0px 0px 20px 5px ${theme.palette.neutral.light}`,
  borderRadius: '10px',
  cursor: 'pointer',
};

export const charityGraphInfoStackSx: SxProps = {
  width: '100%',
};

export const charityGraphStackSx: SxProps = {
  paddingTop: 1,
  paddingBottom: 1,
  width: '90%',
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
  maxWidth: '40px',
  minWidth: '40px',
  width: '40px',
};
