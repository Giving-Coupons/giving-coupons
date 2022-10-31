import { alpha } from '@mui/material';
import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const dialogPaperSx: SxProps = {
  backgroundImage: 'linear-gradient(0deg, #FF9D41 0%, #FFC428 100%)',
};

export const containerSx: SxProps = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
};

export const stackSx: SxProps = {
  height: '100%',
  maxHeight: '560px',
  width: '100%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const swiperSx = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  '--swiper-navigation-color': '#FFFFFF',
};

export const desktopSwiperSx = {
  ...swiperSx,
  width: '80%',
  height: '80%',
};

export const mobileSwiperSx = {
  ...swiperSx,
  width: '100%',
  height: '80%',
};

export const slideContainerSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

const slideSx: SxProps = {
  height: '90%',
  width: '80%',
  borderRadius: '20px',
  padding: '16px',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: alpha('#FFFFFF', 0.25),
};

export const desktopSlideSx: SxProps = {
  ...slideSx,
  height: '90%',
  width: '80%',
};

export const mobileSlideSx: SxProps = {
  ...slideSx,
  height: '80%',
  width: '92%',
};

export const primaryDonorImageSx: SxProps = {
  width: '30%',
  height: 'auto',
  objectFit: 'contain',
};

const screenDisplaySx: SxProps = {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
};

export const mobileScreenDisplaySx: SxProps = {
  ...screenDisplaySx,
  width: '100%',
};

export const desktopScreenDisplaySx: SxProps = {
  ...screenDisplaySx,
  width: '60%',
};

export const couponAmountSx: SxProps = {
  fontSize: '2em',
  fontWeight: 800,
  background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const couponReceivedLineContainerSx: SxProps = {
  width: '80%',
  alignItems: 'center',
};

export const lineSx: SxProps = {
  width: '48%',
  height: '1px',
  backgroundColor: theme.palette.neutral.light,
  verticalAlign: 'middle',
};

export const buttonSx: SxProps = {
  backgroundColor: 'transparent',
  color: 'white',
  borderColor: 'white',
  border: '2px solid',
  width: '90%',
  '&:hover': {
    boxShadow: `0px 0px 10px 2px white`,
    borderColor: 'white',
    border: '2px solid',
  },
};
