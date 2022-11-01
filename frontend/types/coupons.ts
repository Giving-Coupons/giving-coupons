import { Moment } from 'moment';
import { CampaignCharityDonationPublicData } from './campaignCharities';
import { CampaignBaseData } from './campaigns';
import { RedemptionData, RedemptionMinimalData } from './redemptions';
import { Nullable } from './utils';

export type CouponBaseData = {
  id: number;
  urlToken: string;
  denomination: number;
  campaignId: number;
  redemptionId: Nullable<number>;
  expiresAt: Moment;
};

export type CouponListData = CouponBaseData & {
  redemption: Nullable<RedemptionMinimalData>;
};

export type CouponRedeemData = CouponBaseData & {
  campaign: CampaignBaseData;
  charities: CampaignCharityDonationPublicData[];
  redemption: Nullable<RedemptionData>;
};

export type CouponProgressData = {
  progress: Nullable<string>;
};

export type CouponRedeemPostData = {
  urlToken: string;
  amount: Nullable<number>;
  campaignCharityId: number;
};

export type CouponRedeemFormData = Partial<Omit<CouponRedeemPostData, 'urlToken'>>;

export type CouponRedirectFormData = {
  hasAcknowledged: boolean;
};
