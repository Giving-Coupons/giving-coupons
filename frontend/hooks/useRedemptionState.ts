import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { RedemptionState, RedemptionStep } from '../types/redemptionState';
import { Nullable } from '../types/utils';
import { getRedemptionStateCookie, setRedemptionStateCookie } from '../utils/redemptionState';

export default function useRedemptionState(
  urlToken: Nullable<string>,
): [
  redemptionState: Nullable<RedemptionState>,
  updateRedemptionStep: (current: RedemptionStep, charityId?: number, personalContribution?: Nullable<number>) => void,
] {
  const { enqueueSnackbar } = useSnackbar();
  const [redemptionState, setRedemptionState] = useState<Nullable<RedemptionState>>(null);

  // Updates state and cookie simultaneously.
  // Like the setRedemptionStateCookie function, use undefined to make no changes to campaignCharityId and personalContribution.
  const updateRedemptionStep = (
    current: RedemptionStep,
    campaignCharityId?: Nullable<number>,
    personalContribution?: Nullable<number>,
  ) => {
    if (!urlToken) {
      // currentUrlToken has not been provided (likely due to initial render not providing query parameters).
      // Return an update function that will appropriately show error message to user.
      enqueueSnackbar(
        'We had a technical issue on our side. Please refresh the webpage and contact us if this problem persists.',
        { variant: 'error' },
      );
      return;
    }

    // Skip if no change.
    if (
      redemptionState?.current === current &&
      redemptionState?.campaignCharityId === campaignCharityId &&
      redemptionState?.personalContribution === personalContribution
    ) {
      return;
    }

    setRedemptionStateCookie(urlToken, current, campaignCharityId, personalContribution).then(setRedemptionState);
  };

  if (!urlToken) {
    return [redemptionState, updateRedemptionStep];
  }

  Promise.resolve().then(async () => {
    try {
      let currentState = await getRedemptionStateCookie(urlToken);
      // If no cookie found or cookie from another coupon's session, reset for current coupon.
      if (!currentState || currentState.urlToken !== urlToken) {
        currentState = await setRedemptionStateCookie(urlToken, RedemptionStep.SELECT_CHARITY, null, null);
      }

      if (JSON.stringify(currentState) !== JSON.stringify(redemptionState)) {
        setRedemptionState(currentState);
      }
    } catch (err) {
      enqueueSnackbar('Unable to retrieve your past coupon history.', { variant: 'error' });
    }
  });

  return [redemptionState, updateRedemptionStep];
}
