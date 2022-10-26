import { getAnalytics, logEvent } from 'firebase/analytics';

// Disable rule to match API of firebase/analytics logEvent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(event: string, params?: { [key: string]: any }) {
  const analytics = getAnalytics();
  logEvent(analytics, event, params);
}

// Disable rule to match API of firebase/analytics logEvent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logException(description: string, fatal: boolean, params?: { [key: string]: any }) {
  const analytics = getAnalytics();
  logEvent(analytics, 'exception', {
    description,
    fatal,
    ...params,
  });
}
