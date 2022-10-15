import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

const borderRadius = '200px';

export const graphSx: SxProps = {
  display: 'flex',
  height: '1em',
  width: '100%',
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

export const onlyBarSx: SxProps = {
  border: '2px solid #FFFFFF',
  backgroundColor: theme.palette.neutral.light,
  borderRadius: borderRadius,
};
