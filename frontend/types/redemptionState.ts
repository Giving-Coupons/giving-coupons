import { Nullable } from './utils';

export enum RedemptionStep {
  SelectCharity = 'SELECT_CHARITY',
  SelectAmount = 'SELECT_AMOUNT',
  VerifyRedemption = 'VERIFY_REDEMPTION',
}

export type RedemptionState = {
  urlToken: string;
  stateLastUpdatedAt: string; // ISO8601 date time
  current: RedemptionStep;

  campaignCharityId: Nullable<number>;
  personalContribution?: Nullable<number>;
};
