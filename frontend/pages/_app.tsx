import { ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { useCallback } from 'react';
import NavBar from '../components/navigation/Navbar';
import { AxiosInterceptor } from '../frontendApis/interceptor';
import '../styles/globals.scss';
import { theme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const initFirebase = useCallback(async () => {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });

    const isAnalyticsSupported = await isSupported();
    if (isAnalyticsSupported) {
      getAnalytics(app);
    }
  }, [initializeApp]);

  initFirebase();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider maxSnack={3}>
          <AxiosInterceptor>
            <NavBar />

            <Component {...pageProps} />
          </AxiosInterceptor>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
