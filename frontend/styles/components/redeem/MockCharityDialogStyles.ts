import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const cardSx: SxProps = {
  backgroundColor: 'white',
  width: '88%',
  height: '88%',
  borderRadius: '10px',
  boxShadow: `0px 0px 10px 0px ${theme.palette.neutral.light}`,
  padding: '8px',
};

export const logoSx: SxProps = {
  width: '10%',
  aspectRatio: '1 / 1',
  borderRadius: '4px',
  backgroundColor: theme.palette.neutral.light,
};

const textSx: SxProps = {
  height: '6px',
  borderRadius: '10px',
  backgroundColor: theme.palette.neutral.light,
};

export const shorterTextSx: SxProps = {
  ...textSx,
  width: '60%',
};

export const longerTextSx: SxProps = {
  ...textSx,
  width: '100%',
};

export const imageSx: SxProps = {
  width: '100%',
  height: '50%',
  backgroundColor: theme.palette.neutral.light,
};
