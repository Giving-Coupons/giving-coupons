import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const topGraphLegendSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
};

export const bottomGraphLegendSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
};

export const graphLabelSx: SxProps = {
  color: '#FFFFFF',
  fontWeight: 600,
  lineHeight: 1.2,
};

export const leftBarSx: SxProps = {
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const rightBarSx: SxProps = {
  backgroundColor: theme.palette.secondaryTranslucent.main,
};
