import { CharityData } from './charity';
import { DonationBreakdownData } from './donations';
import { PrimaryDonorData } from './primaryDonor';
import { WithoutId } from './utils';

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

export type CampaignCharityDonationPublicData = CampaignCharityData &
  DonationBreakdownData & { primaryDonor: PrimaryDonorData };

export type CampaignCharityDonationData = CampaignCharityData &
  DonationBreakdownData & { primaryDonor: PrimaryDonorData };

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
