import { ApiResponse } from '../../types/api';

export function mapOnApiResponse<D1, D2>(fun: (arg: D1) => D2): (res: ApiResponse<D1>) => ApiResponse<D2> {
  return (x: ApiResponse<D1>) => {
    const { payload, message } = x;
    return { message, payload: payload !== null ? fun(payload) : null };
  };
}
