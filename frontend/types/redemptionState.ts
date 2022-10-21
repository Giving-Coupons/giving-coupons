import { Nullable } from './utils';

export enum RedemptionStep {
  Initial = 'Initial',
  InstructionsCompleted = 'InstructionsCompleted',
  CharitySelected = 'CharitySelected',
  AmountSelected = 'AmountSelected',
  PersonalContributionMade = 'PersonalContributionMade',
  RedemptionVerified = 'RedemptionVerified',
}

type SessionIdentifier = {
  urlToken: string;
  stateLastUpdatedAt: string; // ISO8601 date time
};

type InitialData = {
  step: RedemptionStep.Initial;
};

type InstructionsCompletedData = {
  step: RedemptionStep.InstructionsCompleted;
};

type CharitySelectedData = {
  step: RedemptionStep.CharitySelected;
  charityId: number;
};

type AmountSelectedData = {
  step: RedemptionStep.AmountSelected;
  charityId: number;
  personalContribution: Nullable<number>;
};

// This step will be skipped over if the user chooses not to make a contribution.
type PersonalContributionMadeData = {
  step: RedemptionStep.PersonalContributionMade;
  charityId: number;
  personalContribution: number;
};

type RedemptionVerifiedData = {
  step: RedemptionStep.RedemptionVerified;
  charityId: number;
  personalContribution: Nullable<number>;
};

export type RedemptionStepData =
  | InitialData
  | InstructionsCompletedData
  | CharitySelectedData
  | AmountSelectedData
  | PersonalContributionMadeData
  | RedemptionVerifiedData;

export type RedemptionState = {
  session: SessionIdentifier;
  lastCompleted: RedemptionStepData;
};
