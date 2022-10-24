import { Nullable, WithoutId } from './utils';

type DonationData = {
  amount: number;
  fraction: Nullable<number>;
};

export type DonationBreakdownData = {
  primaryDonation: DonationData;
  secondaryDonation: DonationData;
};

export type SecondaryDonationData = {
  id: number;
  amount: number;
  campaignCharityId: number;
};

export type SecondaryDonationPostData = WithoutId<SecondaryDonationData>;

export type SecondaryDonationFormData = Partial<SecondaryDonationPostData>;
