import { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiPromise, ApiResponse, StatusMessageType } from '../types/api';
import AxiosClient from './axiosClient';

class BaseAPI {
  private client = AxiosClient.instance;

  private clientGet<D, R>(url: string, config?: AxiosRequestConfig<D>): AxiosPromise<ApiResponse<R>> {
    return this.client.get(url, config);
  }

  private clientPost<D, R>(url: string, data: D): AxiosPromise<ApiResponse<R>> {
    return this.client.post(url, data);
  }

  private clientPut<D, R>(url: string, data: D): AxiosPromise<ApiResponse<R>> {
    return this.client.put(url, data);
  }

  private clientPatch<D, R>(url: string, data: D): AxiosPromise<ApiResponse<R>> {
    return this.client.patch(url, data);
  }

  private clientDelete<R>(url: string): AxiosPromise<ApiResponse<R>> {
    return this.client.delete(url);
  }

  protected get<D, R>(url: string, config?: AxiosRequestConfig<D>): ApiPromise<R> {
    return processRequest(url, this.clientGet(url, config));
  }

  protected post<D, R>(url: string, data?: D): ApiPromise<R> {
    return processRequest(url, this.clientPost(url, data));
  }

  protected put<D, R>(url: string, data: D): ApiPromise<R> {
    return processRequest(url, this.clientPut(url, data));
  }

  protected patch<D, R>(url: string, data: D): ApiPromise<R> {
    return processRequest(url, this.clientPatch(url, data));
  }

  protected delete<R>(url: string): ApiPromise<R> {
    return processRequest(url, this.clientDelete<R>(url));
  }
}

function processRequest<D>(endpoint: string, promise: AxiosPromise<ApiResponse<D>>): ApiPromise<D> {
  const DEFAULT_API_RESPONSE: ApiResponse<null> = Object.freeze({
    payload: null,
    message: {
      message: 'Request failed. Please check your Internet connection.',
      type: StatusMessageType.ERROR,
    },
  });

  return promise
    .then((response: AxiosResponse<ApiResponse<D>>) => {
      const apiResponse: ApiResponse<D> = response.data;

      apiResponse.statusCode = response.status;

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `[API] ${endpoint} : ${apiResponse.message ? apiResponse.message.message : 'No message for response'}`,
        );
      }

      return apiResponse;
    })
    .catch((error: AxiosError<ApiResponse<D>>) => {
      const apiResponse = { statusCode: error.response?.status, ...(error.response?.data ?? DEFAULT_API_RESPONSE) };

      if (process.env.NODE_ENV === 'development') {
        console.error(
          `[API] ${endpoint} : ${apiResponse.message ? apiResponse.message.message : 'No message for response'}`,
        );
      }

      throw apiResponse;
    });
}

export default BaseAPI;
