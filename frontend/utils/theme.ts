import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    contrast: Palette['primary'];
    primaryTranslucent: Palette['primary'];
    secondaryTranslucent: Palette['primary'];
    overlayTranslucent: Palette['primary'];
  }
  interface PaletteOptions {
    contrast: PaletteOptions['primary'];
    primaryTranslucent: PaletteOptions['primary'];
    secondaryTranslucent: PaletteOptions['primary'];
    overlayTranslucent: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: `"Urbanist", sans-serif`,
    h1: {
      fontSize: '2em',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5em',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.3em',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1em',
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.8em',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.7em',
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      light: '#FFE4AE',
      main: '#FF7200',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FFE7AB',
      main: '#FFC428',
    },
    contrast: {
      light: '#BDE7FF',
      main: '#1E76DD',
      dark: '#002584',
    },
    primaryTranslucent: {
      main: alpha('#FF7200', 0.5),
    },
    secondaryTranslucent: {
      light: alpha('#FFE7AB', 0.5),
      main: alpha('#FFC428', 0.5),
    },
    overlayTranslucent: {
      main: alpha('#0B0B0C', 0.6),
    },
    error: {
      main: '#FF4343',
    },
    warning: {
      main: '#FF9315',
    },
    info: {
      main: '#1E76DD',
    },
    success: {
      main: '#09B4A9',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            borderRadius: 30,
            boxShadow: '0px 0px 8px 0px #FF9315',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderRadius: 30,
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            borderRadius: 30,
          },
        },
      ],
    },
  },
});