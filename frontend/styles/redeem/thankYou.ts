import { SxProps } from '@mui/material';
import { theme } from '../../utils/theme';

export const stackSx: SxProps = {
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  padding: '0 20px',
};

export const lottieContainerSx: SxProps = {
  width: '250px',
  maxWidth: '250px',
};

export const lottieFrameSx: SxProps = {
  width: '500px',
  maxWidth: '500px',
  marginTop: '-125px',
  marginLeft: '-125px',
  marginBottom: '-75px',
};

export const buttonSx: SxProps = {
  height: '180px',
};
