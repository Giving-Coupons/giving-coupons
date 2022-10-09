import { Bloodtype } from '@mui/icons-material';
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


// Landing page css
export const hero: SxProps = {
  background: 'radial-gradient(closest-side, #FFC428, #F9FF28, #FDFFB6);',
  height: '80vh',
  width: '100vw',
};

// OOCSS
export const marTop5: SxProps = {
  marginTop: '5px',
};

export const marTop10: SxProps = {
  marginTop: '10px',
};

export const spacing2: SxProps = {
  marginTop: '2rem',
};

export const marLeft10: SxProps = {
  marginLeft: '10px',
};

export const marRight10: SxProps = {
  marginRight: '10px',
};

export const shiftRight: SxProps = {
  marginLeft: 'auto',
};

export const largeFont: SxProps = {
  fontSize: '3rem',
};

export const impactText: SxProps = {
  color: theme.palette.primary.main,
  fontWeight: 'bold',
};

export const gradientSection: SxProps = {
  background: 'linear-gradient(#FFC428, #FFEEC2)',
  height: '80vh',
  width: '100vw',
  paddingTop: '10px',
}

export const buttonSecondary: SxProps = {
  minWidth: '50%',
  margin: '10px 0px',
  color: 'blue',
};
