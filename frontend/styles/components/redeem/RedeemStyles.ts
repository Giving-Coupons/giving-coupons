import { SxProps } from '@mui/system';

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
  paddingLeft: '2px',
};
