import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { AxiosInterceptor } from '../frontendApis/interceptor';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AxiosInterceptor>
        <Component {...pageProps} />
      </AxiosInterceptor>
    </SnackbarProvider>
  );
}

export default MyApp;
