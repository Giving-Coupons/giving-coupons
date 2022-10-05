import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { ReactElement, useEffect, useState } from 'react';
import { ApiResponse } from '../types/api';
import AxiosClient from './axiosClient';

import { saveAuthHeaders, setAuthHeaders } from './helpers/authHeaders';

interface Props {
  children: ReactElement;
}

const AxiosInterceptor = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);

  useEffect(() => {
    const requestInterceptor = AxiosClient.instance.interceptors.request.use((requestConfig: AxiosRequestConfig) =>
      setAuthHeaders(requestConfig),
    );

    const responseInterceptor = AxiosClient.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<null>>) => {
        const statusMessage = response?.data?.message?.message;
        if (statusMessage) {
          enqueueSnackbar(statusMessage, { variant: 'success' });
        }

        saveAuthHeaders(response);
        return response;
      },
      (error: AxiosError<ApiResponse<null>>) => {
        const statusMessage = error?.response?.data?.message?.message;
        if (statusMessage) {
          enqueueSnackbar(statusMessage, { variant: 'error' });
        }

        return error;
      },
    );

    setIsIntercepted(true);

    return () => {
      AxiosClient.instance.interceptors.request.eject(requestInterceptor);
      AxiosClient.instance.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsIntercepted]);

  if (!isIntercepted) return null;

  return children;
};

export { AxiosInterceptor };
