import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { AxiosInterceptor } from '../frontendApis/interceptor';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AxiosInterceptor>
          <Component {...pageProps} />
        </AxiosInterceptor>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
