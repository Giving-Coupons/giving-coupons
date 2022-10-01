import { Nullable } from './utils';

export enum StatusMessageType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface StatusMessage {
  type: StatusMessageType;
  message: string;
}

export interface ApiResponse<D> {
  payload: Nullable<D>;
  message: Nullable<StatusMessage>;
}

export type ApiPromise<D> = Promise<ApiResponse<D>>;
