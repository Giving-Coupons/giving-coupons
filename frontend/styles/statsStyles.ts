import { SxProps } from '@mui/system';
import { theme } from '../utils/theme';
import StepsBackground from '../public/steps-background.png';

export const rootSx: SxProps = {
  height: '100vh',
  backgroundImage: `url(${StepsBackground.src})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-around',
  alignItems: 'center',
  textAlign: 'center',
  padding: '30px',
};

export const numberSx: SxProps = {
  fontFamily: 'Saira Condensed, sans-serif',
  fontWeight: '800',
  fontSize: '10em',
  background: `-webkit-linear-gradient(45deg, blue 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const ctaSx: SxProps = {
  fontFamily: 'MoreSugar',
  fontWeight: '500',
  fontSize: '7em',
  background: `-webkit-linear-gradient(45deg, blue 30%, indigo 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const leftSectionSx: SxProps = {
  width: '50%',
};
