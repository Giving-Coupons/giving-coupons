import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const accordianSx: SxProps = {
  width: '100%',
  boxShadow: `0px 0px 20px 5px ${theme.palette.neutral.light}`,
  borderRadius: '20px !important',

  '&:before': {
    backgroundColor: 'transparent !important',
  },
};

export const stackSx: SxProps = {
  width: '100%',
};

export const charityGraphStackSx: SxProps = {
  margin: '10px',
  width: '90%',
};

export const graphSx: SxProps = {
  height: '0.7em',
  width: '100%',
  '&>div': { border: 'none' },
};

export const charityLogoSx: SxProps = {
  margin: '0 10px',
  maxHeight: '40px',
  minHeight: '40px',
  height: '40px',
  maxWidth: '40px',
  minWidth: '40px',
  width: '40px',
};

export const charityDesktopImageSx: SxProps = {
  width: '50%',
};

export const charityDesktopDescriptionSx: SxProps = {
  width: '50%',
};

export const charityMobileImageSx: SxProps = {
  width: '100%',
};

export const charityMobileDescriptionSx: SxProps = {
  width: '100%',
};
