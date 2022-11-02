import { SxProps } from '@mui/material';
import { theme } from '../../utils/theme';

export const swiperSx = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  '--swiper-navigation-color': theme.palette.secondaryTranslucent.main,
};

export const swiperSlideSx = {
  padding: 20,
};

export const desktopStackSx: SxProps = {
  width: '75%',
};
