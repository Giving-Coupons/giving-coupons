import { SxProps } from '@mui/system';
import StepsBackground from '../public/steps-background.png';
import { theme } from '../utils/theme';

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
  background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};
