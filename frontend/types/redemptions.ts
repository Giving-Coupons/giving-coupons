import { Moment } from 'moment';
import { CampaignCharityData } from './campaignCharities';
import { CharityMinimalData } from './charity';
import { SecondaryDonationData } from './donations';
import { Nullable } from './utils';

export type RedemptionMinimalData = {
  charity: CharityMinimalData;
  secondaryDonation: SecondaryDonationData;
  redeemedAt: Moment;
};

export type RedemptionData = {
  redeemedAt: Moment;
  campaignCharity: CampaignCharityData;
  secondaryDonation: SecondaryDonationData;
};

export type RedemptionPostData = {
  urlToken: string;
  amount: Nullable<number>;
  campaignCharityId: number;
};

export type RedemptionFormData = Partial<Omit<RedemptionPostData, 'urlToken'>>;
