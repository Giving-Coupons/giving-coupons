import { Response } from '../types/api';

const shouldRetryOnError = (error: Response<never>): boolean => {
  return error.statusCode !== 404;
};

export const swrConfig = {
  shouldRetryOnError,
};
