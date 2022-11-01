import { Moment } from 'moment';
import { CampaignCharityData } from './campaignCharities';
import { CharityMinimalData } from './charity';
import { SecondaryDonationData } from './donations';

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
