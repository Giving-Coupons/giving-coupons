import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { ApiResponse } from '../types/api';
import { handleDates } from '../utils/dates';
import AxiosClient from './axiosClient';

import { saveAuthHeaders, setAuthHeaders } from './helpers/authHeaders';

interface Props {
  children: React.ReactNode;
}

const AxiosInterceptor = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);

  useEffect(() => {
    const requestInterceptor = AxiosClient.instance.interceptors.request.use((requestConfig: AxiosRequestConfig) =>
      setAuthHeaders(requestConfig),
    );

    // We do not know the type of ApiResponse<D> so we use null to get type information about StatusMessage
    const responseInterceptor = AxiosClient.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<unknown>>) => {
        const statusMessage = response?.data?.message?.message;
        if (statusMessage) {
          enqueueSnackbar(statusMessage, { variant: 'success' });
        }

        saveAuthHeaders(response);
        response.data.payload = handleDates(response.data.payload);
        return response;
      },
      (error: AxiosError<ApiResponse<null>>) => {
        const statusMessage = error?.response?.data?.message?.message;
        const statusCode = error?.response?.status;

        if (statusMessage) {
          const preventDuplicate = statusCode === 404;
          enqueueSnackbar(statusMessage, { variant: 'error', preventDuplicate });
        } else if (error?.message == 'Network Error') {
          enqueueSnackbar('Unable to connect to the server, please try again later.', { variant: 'error' });
        } else {
          enqueueSnackbar('The request could not be completed, please try again later.', { variant: 'error' });
        }

        return Promise.reject(error);
      },
    );

    setIsIntercepted(true);

    return () => {
      AxiosClient.instance.interceptors.request.eject(requestInterceptor);
      AxiosClient.instance.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsIntercepted]);

  if (!isIntercepted) return null;

  return <>{children}</>;
};

export { AxiosInterceptor };
