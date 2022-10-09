import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

const borderRadius = '200px';

export const graphSx: SxProps = {
  display: 'flex',
};

export const middleBarSx: SxProps = {
  borderTop: '2px solid #FFFFFF',
  borderLeft: '2px solid #FFFFFF',
  borderBottom: '2px solid #FFFFFF',
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const firstBarSx: SxProps = {
  ...middleBarSx,
  borderTopLeftRadius: borderRadius,
  borderBottomLeftRadius: borderRadius,
};

export const lastBarSx: SxProps = {
  border: '2px solid #FFFFFF',
  borderTopRightRadius: borderRadius,
  borderBottomRightRadius: borderRadius,
  backgroundColor: theme.palette.primaryTranslucent.main,
};
