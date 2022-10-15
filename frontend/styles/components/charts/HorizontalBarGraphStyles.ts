import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

const borderRadius = '200px';

export const graphSx: SxProps = {
  display: 'flex',
  height: '2em',
  width: '100%',
};

const commonBarSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const middleBarSx: SxProps = {
  ...commonBarSx,
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
  ...commonBarSx,
  border: '2px solid #FFFFFF',
  borderTopRightRadius: borderRadius,
  borderBottomRightRadius: borderRadius,
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const labelSx: SxProps = {
  textAlign: 'center',
  overflow: 'hidden',
};
