import { RedemptionState, RedemptionStep } from '../types/redemptionState';
import moment from 'moment';
import { Nullable } from '../types/utils';
import { DEFAULT_SECONDARY_DONATION_VALUE } from './constants';
import api from '../frontendApis';

function parseRedemptionStateFromCookie(json: string) {
  return JSON.parse(json) as RedemptionState;
}

/**
 * Get and parse the last saved step of a coupon redemption process.
 *
 * @returns RedemptionState object representing last saved step of a coupon redemption process.
 * @throws Can throw a JSON.parse related error if the saved value is invalid.
 */
export async function getRedemptionStateCookie(urlToken: string) {
  const jsonState = (await api.coupons.getProgress(urlToken)).payload;
  if (!jsonState) {
    return null;
  }

  return parseRedemptionStateFromCookie(jsonState);
}

/**
 * Save the latest step of the coupon redemption process as a cookie.
 * If charityId or personalContribution is set as undefined, no change will be made to that property.
 */
export async function setRedemptionStateCookie(
  urlToken: string,
  current: RedemptionStep,
  campaignCharityId?: Nullable<number>,
  personalContribution?: Nullable<number>,
) {
  const previous = await getRedemptionStateCookie(urlToken);
  if (campaignCharityId === undefined) {
    campaignCharityId = previous?.campaignCharityId ?? null;
  }
  if (personalContribution === undefined) {
    personalContribution =
      previous?.personalContribution === undefined ? DEFAULT_SECONDARY_DONATION_VALUE : previous?.personalContribution;
  }

  const state: RedemptionState = {
    urlToken,
    stateLastUpdatedAt: moment().toISOString(),
    current,
    campaignCharityId,
    personalContribution,
  };

  api.coupons.setProgress(urlToken, JSON.stringify(state));
  return state;
}
