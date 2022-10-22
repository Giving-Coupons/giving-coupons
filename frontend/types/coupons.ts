import { CampaignCharityData, CampaignCharityDonationPublicData } from './campaignCharities';
import { CampaignBaseData } from './campaigns';
import { CharityMinimalData } from './charity';
import { SecondaryDonationData } from './donations';
import { Nullable } from './utils';

export type CouponBaseData = {
  id: number;
  urlToken: string;
  denomination: number;
  campaignId: number;
  campaignCharityId: Nullable<number>;
};

export type CouponListData = CouponBaseData & {
  secondaryDonation: Nullable<SecondaryDonationData>;
  charity: Nullable<CharityMinimalData>;
};

export type CouponRedeemData = CouponBaseData & {
  campaign: CampaignBaseData;
  charities: CampaignCharityDonationPublicData[];
  campaignCharity: Nullable<CampaignCharityData>;
  secondaryDonation: Nullable<SecondaryDonationData>;
};

export type CouponRedeemPostData = {
  urlToken: string;
  amount: number;
  campaignCharityId: number;
};
