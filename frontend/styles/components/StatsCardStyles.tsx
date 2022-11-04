import { theme } from '../../utils/theme';
import { SxProps } from '@mui/system';

export const containerSx: SxProps = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  boxShadow: `0px 0px 20px 5px ${theme.palette.neutral.light}`,
  borderRadius: '20px',
  padding: '15px',
  minWidth: '200px',
  minHeight: '200px',

  '& .MuiTypography-root': {
    textAlign: 'center',

    '&>strong': {
      color: theme.palette.primary.main,
    },
  },
};

export const titleSx = {
  fontSize: '2em',
  fontWeight: 800,
  background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};
