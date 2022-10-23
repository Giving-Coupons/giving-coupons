import { SxProps } from '@mui/material';
import { theme } from '../../../utils/theme';

export const centerSx: SxProps = {
  alignItems: 'center',
};

export const gridContainerSx: SxProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '475px',
  backgroundColor: theme.palette.secondary.main,
  padding: '10px',
  borderRadius: '20px',
  cursor: 'pointer',
  height: '100%',
  minHeight: '110px',
};

export const textGridSx: SxProps = {
  height: '100%',
};

export const headerStackSx: SxProps = {
  padding: '8px',
  borderRadius: '10px',
  backgroundColor: theme.palette.secondaryTranslucent.light,
  height: '100%',
};

export const descriptionStackSx: SxProps = {
  height: '100%',
};

export const iconGridSx: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  alighItems: 'flex-end',
};

export const iconBoxSx: SxProps = {
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const titleSx: SxProps = {
  fontSize: '1rem',
};

export const descriptionSx: SxProps = {
  fontSize: '0.8rem',
  fontWeight: 600,
};
