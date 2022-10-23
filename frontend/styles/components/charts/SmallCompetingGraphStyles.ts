import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const graphLegendSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const graphLabelSx: SxProps = {
  fontSize: '0.8rem',
};

export const leftBarSx: SxProps = {
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const rightBarSx: SxProps = {
  backgroundColor: theme.palette.secondaryTranslucent.main,
};
