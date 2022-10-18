import moment from 'moment';

export const isValidDate = (date: unknown) => date && moment(date).isValid();

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export function isIsoDateString(value: unknown): boolean {
  return Boolean(value) && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: unknown): unknown {
  if (body === null || body === undefined) {
    return body as unknown;
  }

  if (isIsoDateString(body)) {
    return moment(body as string);
  }

  if (typeof body !== 'object') {
    return body as unknown;
  }

  if (Array.isArray(body)) {
    return body.map(handleDates);
  }

  return Object.fromEntries(
    Object.entries(body as { [key: string]: unknown }).map(([k, v]: [string, unknown]) => [k, handleDates(v)]),
  );
}
