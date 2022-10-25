import { Nullable } from './utils';

export enum RedemptionStep {
  SelectCharity = 'SelectCharity',
  SelectAmount = 'SelectAmount',
  VerifyRedemption = 'VerifyRedemption',
}

export type RedemptionState = {
  urlToken: string;
  stateLastUpdatedAt: string; // ISO8601 date time
  current: RedemptionStep;

  charityId?: number;
  personalContribution?: Nullable<number>;
};
