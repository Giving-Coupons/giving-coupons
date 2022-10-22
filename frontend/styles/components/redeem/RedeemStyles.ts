import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const containerSx: SxProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 0',
};

export const formContainerSx: SxProps = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const desktopFormContainerSx: SxProps = {
  ...formContainerSx,
  width: '60%',
};

export const mobileFormContainerSx: SxProps = {
  ...formContainerSx,
  width: '100%',
};

export const radioSx: SxProps = {
  paddingLeft: '0px',
  '&&:hover': {
    backgroundColor: 'transparent',
  },
};

export const progressButtonContainerSx: SxProps = {
  width: '100%',
  justifyContent: 'space-between',
};

export const progressButtonFirstStepContainerSx: SxProps = {
  width: '100%',
  justifyContent: 'end',
};

export const charityLogoSx: SxProps = {
  maxHeight: '40px',
  minHeight: '40px',
  height: '40px',
};

export const givingSgLogoSx: SxProps = {
  maxHeight: '1em',
  minHeight: '1em',
  height: '1em',
  verticalAlign: 'middle',
  padding: '0 2px',
};

export const redirectLineContainerSx: SxProps = {
  width: '60%',
  alignItems: 'center',
};

export const lineSx: SxProps = {
  width: '48%',
  height: '1px',
  backgroundColor: theme.palette.neutral.light,
  verticalAlign: 'middle',
};

export const redirectAmountSx: SxProps = {
  fontSize: '4em',
  fontWeight: 800,
  background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const redirectAcknowledgementContainerSx: SxProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
