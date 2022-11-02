import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';
import DesktopHeaderImage from '../public/landing-page/desktop-header-background.png';
import MobileHeaderImage from '../public/landing-page/mobile-header-background.png';

const sectionSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  paddingTop: 2,
  paddingBottom: 2,
};

export const mobileSectionSx: SxProps = {
  minHeight: `calc(100vh - ${theme.spacing(2)} - ${theme.mixins.toolbar.minHeight}px)`,
  ...sectionSx,
};

export const desktopSectionSx: SxProps = {
  height: `calc(100vh - ${theme.spacing(2)} - ${theme.mixins.toolbar.minHeight}px)`,
  maxHeight: '665px',
  ...sectionSx,
};

export const sectionHeaderSx: SxProps = {
  width: '80%',
};

const headlineContainerSx: SxProps = {
  width: '100%',
  alignItems: 'center',
  backgroundSize: 'cover',
  position: 'absolute',
  top: theme.mixins.toolbar.minHeight,
  zIndex: -1,
};

export const desktopHeadlineBackgroundSx: SxProps = {
  backgroundImage: `url(${DesktopHeaderImage.src})`,
  ...headlineContainerSx,
};

export const mobileHeadlineBackgroundSx: SxProps = {
  backgroundImage: `url(${MobileHeaderImage.src})`,
  ...headlineContainerSx,
};

export const instructionsContainerSx: SxProps = {
  width: '100%',
  alignItems: 'center',
  padding: '16px 0',
};

export const desktopHeadlineTextContainerSx: SxProps = {
  padding: 12,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const mobileHeadlineTextContainerSx: SxProps = {
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export const mobileTextBoxSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const desktopTextContainerSx: SxProps = {
  padding: 12,
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
  fontSize: 50,
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
  height: '80%',
  width: 'auto',
};

export const mobileHeadlineScreenImageSx: SxProps = {
  width: '80%',
  height: 'auto',
};

export const desktopInstructionsImageSx: SxProps = {
  width: '100%',
  height: 'auto',
};

export const mobileInstructionsImageSx: SxProps = {
  width: '90%',
  height: 'auto',
};

export const instructionsImageShadowSx: SxProps = {
  borderRadius: '20px',
  boxShadow: `0px 0px 30px 0px ${theme.palette.neutral.light}`,
};

export const mobileHeadlineImageContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

export const desktopHeadlineImageContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  alignItems: 'center',
};

const instructionsImageContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export const desktopInstructionsImageContainerSx: SxProps = {
  ...instructionsImageContainerSx,
  paddingLeft: 12,
  paddingRight: 12,
};

export const mobileInstructionsImageContainerSx: SxProps = {
  ...instructionsImageContainerSx,
  paddingLeft: 2,
  paddingRight: 2,
};

export const statisticsContainerSx: SxProps = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
};

export const statisticsMainTextSx: SxProps = {
  fontSize: 40,
  fontWeight: 700,
  color: theme.palette.primary.main,
};

export const statisticsSectionSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '50vh',
};

export const statisticsItemsContainerSx: SxProps = {
  width: '100%',
  padding: 4,
};

export const statisticsItemSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const statisticsItemCardSx: SxProps = {
  padding: 2,
  margin: 2,
  width: '80%',
  borderRadius: '20px',
  alignItems: 'center',
};

export const statisticsIconAvatarSx: SxProps = {
  backgroundColor: theme.palette.primary.light,
};

export const statisticsIconSx: SxProps = {
  color: theme.palette.primary.main,
};

export const callToActionSectionSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const callToActionItemSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const callToActionItemContainerSx: SxProps = {
  width: '60%',
};

export const callToActionIconAvatarSx: SxProps = {
  backgroundColor: theme.palette.primary.light,
};

export const callToActionIconSx: SxProps = {
  color: theme.palette.primary.main,
};

export const callToActionLinkSx: SxProps = {
  color: theme.palette.primary.main,
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.dark,
  },
};

export const callToActionLinkIconSx: SxProps = {
  verticalAlign: 'middle',
};

export const desktopFooterSectionSx: SxProps = {
  padding: 2,
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1200px',
};

export const mobileFooterSectionSx: SxProps = {
  padding: 2,
  alignItems: 'center',
  width: '100%',
};

export const copyRightIconSx: SxProps = {
  color: theme.palette.grey[600],
  fontSize: '1em',
};

export const footerButtonSx: SxProps = {
  color: theme.palette.grey[600],
  fontSize: 'medium',
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.grey[900],
  },
};

export const givingCouponsInlineLogoSx: SxProps = {
  maxHeight: '1.6em',
  minHeight: '1.6em',
  height: '1.6em',
  verticalAlign: 'middle',
  padding: '0 2px',
};
