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

export type CampaignCharityDonationPublicData = Omit<CampaignCharityData, 'givingSgUrl'> & DonationBreakdownData;

export type CampaignCharityDonationData = CampaignCharityData & DonationBreakdownData;

export type CampaignCharityPostData = WithoutId<CampaignCharityBaseData>;
