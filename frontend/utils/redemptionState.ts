import { RedemptionState, RedemptionStep } from '../types/redemptionState';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Nullable } from '../types/utils';

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
export function setRedemptionStateCookie(
  urlToken: string,
  current: RedemptionStep,
  charityId?: number,
  personalContribution?: Nullable<number>,
) {
  const state: RedemptionState = {
    urlToken,
    stateLastUpdatedAt: moment().toISOString(),
    current,
    charityId,
    personalContribution,
  };

  Cookies.set(cookieKey, JSON.stringify(state));
  return state;
}
