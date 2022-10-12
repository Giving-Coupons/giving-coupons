import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { AxiosInterceptor } from '../frontendApis/interceptor';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import NavBar from '../components/navigation/Navbar';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider maxSnack={3}>
          <AxiosInterceptor>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <NavBar />

            <Component {...pageProps} />
          </AxiosInterceptor>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
