import { Nullable } from './utils';

export enum RedemptionStep {
  SELECT_CHARITY = 'SELECT_CHARITY',
  SELECT_AMOUNT = 'SELECT_AMOUNT',
  VERIFY_REDEMPTION = 'VERIFY_REDEMPTION',
}

export type RedemptionState = {
  urlToken: string;
  stateLastUpdatedAt: string; // ISO8601 date time
  current: RedemptionStep;

  campaignCharityId: Nullable<number>;
  personalContribution?: Nullable<number>;
};
