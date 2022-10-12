import { WithoutId } from './utils';
import { CharityListData } from './charity';
import { DonationBreakdownData } from './donations';

export type CampaignCharityBaseData = {
  id: number;
  charity: {
    id: number;
  };
  givingSgUrl: string;
};

type CampaignCharityData = CampaignCharityBaseData & {
  charity: CharityListData;
};

export type CampaignCharityListData = Omit<CampaignCharityData, 'givingSgUrl'>;

export type CampaignCharityDonationPublicData = CampaignCharityListData & DonationBreakdownData;

export type CampaignCharityDonationData = CampaignCharityData & DonationBreakdownData;

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
