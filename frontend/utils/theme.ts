import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    contrast: Palette['primary'];
    neutral: Palette['primary'];
    primaryTranslucent: Palette['primary'];
    secondaryTranslucent: Palette['primary'];
    overlayTranslucent: Palette['primary'];
    danger: Palette['primary'];
  }
  interface PaletteOptions {
    contrast: PaletteOptions['primary'];
    neutral: PaletteOptions['primary'];
    primaryTranslucent: PaletteOptions['primary'];
    secondaryTranslucent: PaletteOptions['primary'];
    overlayTranslucent: PaletteOptions['primary'];
    danger: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
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
    // h5 reserved for hero image
    h5: {
      fontSize: '2.5rem',
      fontWeight: 900,
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
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
    neutral: {
      light: '#717171',
      main: '#000000',
    },
    primaryTranslucent: {
      main: alpha('#FF7200', 0.5),
    },
    secondaryTranslucent: {
      light: alpha('#FFE7AB', 0.5),
      main: alpha('#FFC428', 0.5),
    },
    overlayTranslucent: {
      main: alpha('#0B0B0C', 0.5),
    },
    danger: {
      main: '#FF4343',
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
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          color: '#000000',
          backgroundColor: alpha('#FFFFFF', 0.9),
          backdropFilter: 'blur(20px)',
        },
      },
    },
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
        {
          props: { variant: 'outlined', color: 'neutral' },
          style: {
            borderRadius: 30,
            color: '#717171',
            borderColor: '#717171',
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            borderRadius: 30,
          },
        },
      ],
    },
  },
});
