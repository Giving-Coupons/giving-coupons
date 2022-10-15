import moment from 'moment';
import { DATE_FORMAT } from './constants';

export const isValidDate = (date: unknown) => date && moment(date).isValid();

export const formatDate = (isoString: string) => moment(isoString).format(DATE_FORMAT);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object') {
    return body;
  }

  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isIsoDateString(value)) {
      body[key] = moment(value);
    } else if (typeof value === 'object') {
      handleDates(value);
    }
  }
}
