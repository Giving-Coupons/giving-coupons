import { SxProps } from '@mui/system';
import { alpha } from '@mui/material';

export const dialogPaperSx: SxProps = {
  backgroundImage: 'linear-gradient(0deg, #FF9D41 0%, #FFC428 100%)',
};

export const containerSx: SxProps = {
  height: '100vh',
  width: '100vw',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const swiperSx = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  width: '90vw',
  height: '80vh',
  '--swiper-navigation-color': '#FFFFFF',
};

export const desktopSwiperSx = {
  ...swiperSx,
  width: '90vw',
  height: '80vh',
};

export const mobileSwiperSx = {
  ...swiperSx,
  width: '100vw',
  height: '80vh',
};

export const slideContainerSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

export const slideSx: SxProps = {
  height: '90%',
  width: '80%',
  borderRadius: '20px',
  padding: '16px',
  backgroundColor: alpha('#FFFFFF', 0.25),
};
