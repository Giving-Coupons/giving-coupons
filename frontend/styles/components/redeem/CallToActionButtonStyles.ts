import { SxProps } from '@mui/material';
import { theme } from '../../../utils/theme';

export const centerSx: SxProps = {
  alignItems: 'center',
};

export const gridContainerSx: SxProps = {
  ...centerSx,
  justifyContent: 'space-between',
  maxWidth: '475px',
  backgroundColor: theme.palette.secondary.main,
  padding: '15px',
  borderRadius: '20px',
  cursor: 'pointer',
  height: '100%',
};

export const stackSx: SxProps = {
  padding: '8px',
  borderRadius: '10px',
  backgroundColor: theme.palette.secondaryTranslucent.light,
};

export const iconGridSx: SxProps = {
  justifyContent: 'flex-end',
  alighItems: 'flex-end',
};

export const iconBoxSx: SxProps = {
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const descriptionSx: SxProps = {
  fontWeight: 600,
};
