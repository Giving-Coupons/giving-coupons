import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';

export const sectionSx: SxProps = {
  minHeight: `calc(100vh - ${theme.spacing(2)} - ${theme.mixins.toolbar.minHeight}px)`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  paddingTop: 2,
  paddingBottom: 2,
};

export const headlineBackgroundSx: SxProps = {
  position: 'absolute',
  top: '0',
  width: '100%',
  objectFit: 'cover',
  zIndex: '-1',
};

export const desktopHeadlineTextContainerSx: SxProps = {
  padding: 8,
  height: '100%',
};

export const mobileHeadlineTextContainerSx: SxProps = {
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export const desktopHeadlineTextSx: SxProps = {
  fontSize: 80,
  fontWeight: 700,
  lineHeight: 'normal',
};

export const mobileHeadlineTextSx: SxProps = {
  fontSize: 50,
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: 'normal',
};

export const highlightedTextSx: SxProps = {
  background: `-webkit-linear-gradient(0deg, ${theme.palette.primary.main} 10%, ${theme.palette.secondary.main} 80%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const desktopDescriptionTextSx = {
  fontSize: 20,
  color: theme.palette.grey[800],
};

export const mobileDescriptionTextSx = {
  fontSize: 16,
  color: theme.palette.grey[800],
};

export const desktopHeadlineScreenImageSx: SxProps = {
  height: '80vh',
  width: 'auto',
};

export const mobileHeadlineScreenImageSx: SxProps = {
  width: '80vw',
  height: 'auto',
};

export const mobileHeadlineImageContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

export const statisticsSectionSx: SxProps = {
  justifyContent: 'space-evenly',
  minHeight: '50vh',
};

export const statisticsContainerSx: SxProps = {
  width: '100%',
  padding: 4,
};

export const statisticsItemSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
};

export const statisticsItemCardSx: SxProps = {
  boxShadow: `0px 0px 30px 0px ${theme.palette.neutral.light}`,
  padding: 2,
  margin: 2,
  width: '90%',
  borderRadius: '20px',
  alignItems: 'center',
};

export const statisticsIconAvatarSx: SxProps = {
  backgroundColor: theme.palette.primary.light,
};

export const statisticsIconSx: SxProps = {
  color: theme.palette.primary.main,
};
