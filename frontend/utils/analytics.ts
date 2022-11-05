import { getAnalytics, logEvent } from 'firebase/analytics';

export function log(event: string, params?: { [key: string]: unknown }) {
  const analytics = getAnalytics();
  logEvent(analytics, event, params);
}

export function logException(description: string, fatal: boolean, params?: { [key: string]: unknown }) {
  const analytics = getAnalytics();
  logEvent(analytics, 'exception', {
    description,
    fatal,
    ...params,
  });
}
