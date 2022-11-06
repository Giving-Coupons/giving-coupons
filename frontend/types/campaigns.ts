import { Moment } from 'moment';
import {
  CampaignCharityBaseData,
  CampaignCharityDonationData,
  CampaignCharityDonationPublicData,
  CampaignCharityPostData,
} from './campaignCharities';
import { CharityListData } from './charity';
import { CouponListData } from './coupons';
import { DonationBreakdownData, SecondaryDonationData } from './donations';
import { PrimaryDonorData, PrimaryDonorPostData } from './primaryDonor';
import { Nullable, WithoutId } from './utils';

export type CampaignStatus = 'Active' | 'Completed' | 'Upcoming';

export type CampaignListData = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  primaryDonorName: string;
  charities: CharityListData[];
  donations: DonationBreakdownData;
  couponsRedeemedCount: number;
  start: Moment;
  end: Moment;
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
  couponDenomination?: number;
  initialCouponValidity?: number;
  start: Nullable<Moment>;
  end: Nullable<Moment>;
  imageUrl?: string;
  charities: Partial<CampaignCharityBaseData>[];
  primaryDonor?: Partial<PrimaryDonorData>;
};

export type CouponRegenerationFormData = {
  expiryDate: Moment;
};

export type CampaignListQueryParams = {
  name?: string;
  status: {
    isActive: boolean;
    isUpcoming: boolean;
    isCompleted: boolean;
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
  start: Moment;
  end: Moment;
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
  start: Moment;
  end: Moment;
  imageUrl: string;
  charities: CampaignCharityBaseData[];
  primaryDonor: PrimaryDonorData;
  interestId: Nullable<number>;
};

export type CampaignPostData = Omit<WithoutId<CampaignBaseData>, 'charities' | 'primaryDonor'> & {
  charities: CampaignCharityPostData[];
  primaryDonor: PrimaryDonorPostData;
  initialCouponValidity: number;
};

export type CampaignPutData = Omit<
  WithoutId<CampaignBaseData>,
  'charities' | 'primaryDonor' | 'promisedAmount' | 'couponDenomination'
> & {
  charities: CampaignCharityPostData[];
  primaryDonor: PrimaryDonorData;
};

export type CampaignPublicData = Omit<CampaignBaseData, 'charities'> & {
  donations: DonationBreakdownData;
  charities: CampaignCharityDonationPublicData[];
};

export type CampaignAdminData = Omit<CampaignBaseData, 'charities'> & {
  donations: DonationBreakdownData;
  charities: CampaignCharityDonationData[];
  coupons: CouponListData[];
  nonCouponDonations: SecondaryDonationData[];
};
