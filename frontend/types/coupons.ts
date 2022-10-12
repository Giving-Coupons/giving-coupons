import { SecondaryDonationData } from './donations';
import { Nullable } from './utils';
import { CharityMinimalData } from './charity';
import { CampaignBaseData } from './campaigns';
import { CampaignCharityDonationData } from './campaignCharities';

export type CouponBaseData = {
  id: number;
  urlToken: string;
  denomination: number;
  campaignId: number;
};

export type CouponListData = CouponBaseData & {
  secondaryDonation: Nullable<SecondaryDonationData>;
  charity: Nullable<CharityMinimalData>;
};

export type CouponRedeemData = CouponBaseData &
  CampaignBaseData & {
    charities: CampaignCharityDonationData[];
  };
