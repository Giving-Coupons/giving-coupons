import { ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import NavBar from '../components/navigation/Navbar';
import { AxiosInterceptor } from '../frontendApis/interceptor';
import '../styles/globals.scss';
import { theme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_CLIENT_URL;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider maxSnack={3}>
          <AxiosInterceptor>
            <Head>
              <link rel="icon" href={`${PUBLIC_URL}/favicon.ico`} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="theme-color" content="#000000" />
              <meta property="og:title" content="Giving Coupons" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={PUBLIC_URL} />
              <meta property="og:image" content={`${PUBLIC_URL}/giving-coupons.png`} />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta
                property="og:description"
                content="Giving Coupons aims to increase the fundraising ROI on charitable donations and raise awareness about charities that the donor wishes to support by giving out donation coupons. Recipients of the coupon get to decide which charity receives the money specified, and can choose to top it up with their own money. The end goal of Giving Coupons is to encourage more Singaporeans to donate."
              />
              <meta property="og:site_name" content="Giving Coupons" />
              <meta name="twitter:card" content="summary_large_image" />
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
