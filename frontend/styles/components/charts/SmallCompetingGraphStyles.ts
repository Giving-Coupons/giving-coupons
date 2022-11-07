import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const graphLegendSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  userSelect: 'none',
};

const graphLabelSx: SxProps = {
  fontSize: '0.8rem',
};

export const graphLeftLabelSx: SxProps = {
  ...graphLabelSx,
  textAlign: 'left',
};

export const graphRightLabelSx: SxProps = {
  ...graphLabelSx,
  textAlign: 'right',
};

export const leftBarSx: SxProps = {
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const rightBarSx: SxProps = {
  backgroundColor: theme.palette.secondaryTranslucent.main,
};

export const emptyBarSx: SxProps = {
  backgroundColor: theme.palette.neutral.light,
};
