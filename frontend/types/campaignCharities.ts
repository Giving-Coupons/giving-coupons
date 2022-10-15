import { WithoutId } from './utils';
import { CharityData, CharityListData } from './charity';
import { DonationBreakdownData } from './donations';

export type CampaignCharityBaseData = {
  id: number;
  charity: {
    id: number;
  };
  givingSgUrl: string;
};

type CampaignCharityData = CampaignCharityBaseData & {
  charity: CharityData;
};

export type CampaignCharityDonationPublicData = CampaignCharityData & DonationBreakdownData;

export type CampaignCharityDonationData = CampaignCharityData & DonationBreakdownData;

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
