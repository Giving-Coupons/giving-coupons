import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';

export const examplesContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const buttonSx: SxProps = {
  minWidth: '50%',
  margin: '10px 0px',
};

export const imageContainerSx: SxProps = {
  position: 'relative',
};

export const imageSx: SxProps = {
  maxWidth: '100%',
};

export const imageOverlaySx: SxProps = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.overlayTranslucent.main,
  zIndex: 10,
};

export const graphSx: SxProps = {
  position: 'absolute',
  bottom: '2em',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '90%',
  height: '2em',
  zIndex: 20,
};

export const primaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const secondaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.secondaryTranslucent.main,
};

export const contrastText: SxProps = {
  color: theme.palette.contrast.dark,
};

export const headlineSectionBoxResponsiveSx: SxProps = {
  minHeight: '95vh',
  width: '100%',
  marginBottom: { xs: '80px', md: '0px' },
  alignItems: 'center',
  justifyContent: 'center',
};

export const headlineImageSx: SxProps = {
  display: 'block',
  height: '100%',
  width: '100%',
};

export const headlineTextGridSx: SxProps = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

export const headlineTextStackSx: SxProps = {
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '100%',
  width: '80%',
};

export const statsSectionSx: SxProps = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const statsSectionGridSx: SxProps = {
  marginTop: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
};

export const statsSectionGridItemSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const statsSectionGridItemStackSx: SxProps = {
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const statsSectionImageSx: SxProps = {
  display: 'block',
  height: '100px',
  width: '100px',
};

export const charityImageBlobResponsiveSx: SxProps = {
  display: { xs: 'block', md: 'none' },
  width: '100vw',
  objectFit: 'contain',
};

export const charityImageLargeResponsiveSx: SxProps = {
  display: { xs: 'none', md: 'block' },
  marginTop: '2rem',
  width: '100vw',
  height: '40vh',
  objectFit: 'cover',
};

export const howItWorksSectionSx: SxProps = {
  height: { xs: '95vh', sm: '90vh' },
  width: '90%',
  maxWidth: '800px',
  margin: 'auto',
  display: 'flex',
};

export const howItWorksHeaderSx: SxProps = {
  marginTop: '80px',
  textAlign: 'center',
};

export const howItWorksStackSx: SxProps = {
  marginTop: '10px',
  justifyContent: 'space-between',
  width: '100%',
};

export const howItWorksImageSx: SxProps = {
  display: 'block',
  height: '60px',
  width: '60px',
};

export const orgDescriptionSx: SxProps = {
  marginTop: '5px',
};

export const largeImpactTextSx: SxProps = {
  fontSize: '3rem',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
};

export const buttonSecondary: SxProps = {
  minWidth: '50%',
  margin: '10px 0px',
  color: 'blue',
};

export const buttonCard: SxProps = {
  backgroundImage: 'linear-gradient(to right, #FFF428 , #FF3200)',
  maxWidth: 345,
};

export const callToActionStackSx: SxProps = {
  height: '30vh',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '2rem',
};

export const callToActionSectionGridItemSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const givingCouponsNoticeSx: SxProps = {
  width: '100%',
  height: '30vh',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  padding: '10px',
};
