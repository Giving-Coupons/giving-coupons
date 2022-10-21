import { RedemptionState, RedemptionStepData } from '../types/redemptionState';
import Cookies from 'js-cookie';
import moment from 'moment';

const cookieKey = 'redemptionState';

function parseRedemptionStateFromCookie(json: string) {
  return JSON.parse(json) as RedemptionState;
}

/**
 * Get and parse the last saved step of a coupon redemption process.
 *
 * @returns RedemptionState object representing last saved step of a coupon redemption process.
 * @throws Can throw a JSON.parse related error if the saved value is invalid.
 */
export function getRedemptionStateCookie() {
  const jsonState = Cookies.get(cookieKey);
  if (!jsonState) {
    return null;
  }

  return parseRedemptionStateFromCookie(jsonState);
}

/** Save the latest step of the coupon redemption process as a cookie.. */
export function setRedemptionStateCookie(urlToken: string, completed: RedemptionStepData) {
  const state: RedemptionState = {
    session: { urlToken, stateLastUpdatedAt: moment().toISOString() },
    lastCompleted: completed,
  };

  Cookies.set(cookieKey, JSON.stringify(state));
  return state;
}
