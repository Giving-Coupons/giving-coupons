import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';

export const sectionSx: SxProps = {
  minHeight: `calc(100vh - ${theme.spacing(2)} - ${theme.mixins.toolbar.minHeight}px)`,
  display: 'flex',
  alignItems: 'center',
  maxWidth: '1200px',
};

export const headlineBackgroundSx: SxProps = {
  position: 'absolute',
  top: '0',
  height: '100vh',
  width: '100vw',
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
