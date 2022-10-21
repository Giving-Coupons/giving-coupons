import { WithoutId } from './utils';
import { CharityData } from './charity';
import { DonationBreakdownData } from './donations';
import { PrimaryDonorData } from './primaryDonor';

export type CampaignCharityBaseData = {
  id: number;
  charity: {
    id: number;
  };
  givingSgUrl: string;
};

export type CampaignCharityData = CampaignCharityBaseData & {
  charity: CharityData;
};

export type CampaignCharityDonationPublicData = (CampaignCharityData & DonationBreakdownData) & {
  primaryDonor: PrimaryDonorData;
};

export type CampaignCharityDonationData = CampaignCharityData & DonationBreakdownData & PrimaryDonorData;

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
