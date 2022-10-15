import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const donationBreakdownItemContainer: SxProps = {
  alignItems: 'center',
};

export const charityLogoSx: SxProps = {
  maxHeight: '48px',
  minHeight: '48px',
  height: '48px',
};

export const leftBarSx: SxProps = {
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const rightBarSx: SxProps = {
  backgroundColor: theme.palette.secondaryTranslucent.main,
};
