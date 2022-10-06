import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    contrast: Palette['primary'];
  }
  interface PaletteOptions {
    contrast: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: `"Urbanist", sans-serif`,
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
