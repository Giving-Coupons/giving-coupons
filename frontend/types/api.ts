import { Nullable } from './utils';

export enum StatusMessageType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface StatusMessage {
  type: StatusMessageType;
  message: string;
}

export interface Response<D> {
  payload: D;
  message: Nullable<StatusMessage>;
}

export type ApiResponse<D> = Response<D | null>;

export type ApiPromise<D> = Promise<ApiResponse<D>>;
