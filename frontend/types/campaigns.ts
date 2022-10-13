import { Nullable, WithoutId } from './utils';
import { Moment } from 'moment';
import { PrimaryDonorData, PrimaryDonorPostData } from './primaryDonor';
import {
  CampaignCharityBaseData,
  CampaignCharityDonationData,
  CampaignCharityDonationPublicData,
  CampaignCharityPostData,
} from './campaignCharities';
import { DonationBreakdownData } from './donations';
import { CouponListData } from './coupons';
import { CharityListData } from './charity';

export type CampaignListData = {
  id: number;
  name: string;
  description: string;
  imageBase64: string;
  charities: CharityListData[];
  donations: DonationBreakdownData;
  couponsRedeemedCount: number;
};

export type CampaignSearchFormData = {
  name?: string;
  status: {
    isActive: boolean;
    isUpcoming: boolean;
    isCompleted: boolean;
  };
  startDateFrom: Nullable<Moment>;
  startDateTo: Nullable<Moment>;
  endDateFrom: Nullable<Moment>;
  endDateTo: Nullable<Moment>;
};

export type CampaignFormData = {
  name?: string;
  description?: string;
  promisedAmount?: number;
  start: Nullable<Moment>;
  end: Nullable<Moment>;
  imageBase64?: string;
  charities: Partial<CampaignCharityBaseData>[];
  primaryDonor?: Partial<PrimaryDonorData>;
  interestId: Nullable<number>;
};

export type CampaignListQueryParams = {
  name?: string;
  status?: {
    isActive?: boolean;
    isUpcoming?: boolean;
    isCompleted?: boolean;
  };
  start?: {
    from?: string;
    to?: string;
  };
  end?: {
    from?: string;
    to?: string;
  };
};

export type CampaignAdminListData = {
  id: number;
  name: string;
  promisedAmount: number;
  start: string;
  end: string;
  primaryDonor: {
    id: number;
    name: string;
  };
};

export type CampaignBaseData = {
  id: number;
  name: string;
  description: string;
  promisedAmount: number;
  couponDenomination: number;
  start: string;
  end: string;
  imageBase64: string;
  charities: CampaignCharityBaseData[];
  primaryDonor: PrimaryDonorData;
  interestId: Nullable<number>;
};

export type CampaignPostData = Omit<WithoutId<CampaignBaseData>, 'charities' | 'primaryDonor'> & {
  charities: CampaignCharityPostData[];
  primaryDonor: PrimaryDonorPostData;
};

export type CampaignPutData = CampaignPostData;

export type CampaignPublicData = CampaignBaseData & {
  donations: DonationBreakdownData;
  charities: CampaignCharityDonationPublicData[];
};

export type CampaignAdminData = CampaignBaseData & {
  donations: DonationBreakdownData;
  charities: CampaignCharityDonationData[];
  coupons: CouponListData[];
};
