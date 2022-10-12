import { Nullable, WithoutId } from './utils';

type DonationData = {
  amount: number;
  fraction: number;
};

export type DonationBreakdownData = {
  primaryDonor: DonationData;
  secondaryDonors: DonationData;
};

export type SecondaryDonationData = {
  id: number;
  couponId: Nullable<number>;
  amount: number;
  campaignsCharityId: number;
};

export type SecondaryDonationPostData = WithoutId<SecondaryDonationData>;
