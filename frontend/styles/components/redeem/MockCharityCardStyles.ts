import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const cardSx: SxProps = {
  backgroundColor: 'white',
  width: '80%',
  height: '6vh',
  borderRadius: '10px',
  boxShadow: `0px 0px 10px 0px ${theme.palette.neutral.light}`,
  padding: '4px',
};

export const imageSx: SxProps = {
  width: '20%',
  aspectRatio: '1 / 1',
  borderRadius: '10px',
  backgroundColor: theme.palette.neutral.light,
};

export const textContainerSx: SxProps = {
  width: '60%',
  height: '100%',
  justifyContent: 'space-evenly',
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
