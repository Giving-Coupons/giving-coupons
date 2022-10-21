import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { RedemptionState, RedemptionStepData } from '../types/redemptionState';
import { Nullable } from '../types/utils';
import { getRedemptionStateCookie, setRedemptionStateCookie } from '../utils/redemptionState';

export default function useRedemptionState(
  urlToken: Nullable<string>,
): [redemptionState: Nullable<RedemptionState>, updateRedemptionStep: (a: RedemptionStepData) => void] {
  const { enqueueSnackbar } = useSnackbar();
  const [redemptionState, setRedemptionState] = useState<Nullable<RedemptionState>>(null);

  function updateStateAndCookie(stepData: RedemptionStepData) {
    if (!urlToken) {
      // currentUrlToken has not been provided (likely due to initial render not providing query parameters).
      // Return an update function that will appropriately show error message to user.
      enqueueSnackbar(
        'We had a technical issue on our side. Please refresh the webpage and contact us if this problem persists.',
        { variant: 'error' },
      );
      return;
    }

    const state = setRedemptionStateCookie(urlToken, stepData);
    setRedemptionState(state);
  }

  try {
    setRedemptionState(getRedemptionStateCookie());
  } catch (err) {
    enqueueSnackbar('Unable to retrieve your past coupon history.', { variant: 'error' });
  }

  return [redemptionState, updateStateAndCookie];
}
