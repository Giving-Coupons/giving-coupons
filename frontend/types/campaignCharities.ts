import { WithoutId } from './utils';
import { CharityData } from './charity';
import { DonationBreakdownData } from './donations';

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

export type CampaignCharityDonationPublicData = Omit<CampaignCharityData, 'givingSgUrl'> & DonationBreakdownData;

export type CampaignCharityDonationData = CampaignCharityData & DonationBreakdownData;

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
