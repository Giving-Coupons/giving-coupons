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

const desktopTextContainerSx: SxProps = {
  padding: 8,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const desktopLeftTextContainerSx: SxProps = {
  ...desktopTextContainerSx,
  alignItems: 'start',
};

export const desktopRightTextContainerSx: SxProps = {
  ...desktopTextContainerSx,
  alignItems: 'end',
};

export const mobileTextContainerSx: SxProps = mobileHeadlineTextContainerSx;

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

export const desktopInstructionsTitleTextSx: SxProps = {
  fontSize: 60,
  fontWeight: 700,
  lineHeight: 'normal',
};

export const mobileInstructionsTitleTextSx: SxProps = {
  fontSize: 40,
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

const desktopInstructionsDescriptionTextSx: SxProps = {
  fontSize: 16,
  color: theme.palette.grey[800],
};

export const desktopRightInstructionsDescriptionTextSx: SxProps = {
  ...desktopInstructionsDescriptionTextSx,
  textAlign: 'end',
};

export const desktopLeftInstructionsDescriptionTextSx: SxProps = {
  ...desktopInstructionsDescriptionTextSx,
  textAlign: 'start',
};

export const mobileInstructionsDescriptionTextSx: SxProps = {
  fontSize: 12,
  color: theme.palette.grey[800],
  textAlign: 'center',
};

export const desktopHeadlineScreenImageSx: SxProps = {
  height: '80vh',
  width: 'auto',
};

export const mobileHeadlineScreenImageSx: SxProps = {
  width: '80vw',
  height: 'auto',
};

export const desktopInstructionsImageSx: SxProps = {
  width: '60%',
  height: 'auto',
};

export const mobileInstructionsImageSx: SxProps = {
  width: '60%',
  height: 'auto',
};

export const startCampaignImageSx: SxProps = {
  borderRadius: '20px',
  boxShadow: `0px 0px 30px 0px ${theme.palette.neutral.light}`,
};

export const mobileHeadlineImageContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

export const instructionsImageContainerSx: SxProps = {
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
