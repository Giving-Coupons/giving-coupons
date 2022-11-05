import { Moment } from 'moment';
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
  donatedAt: Moment;
};

export type SecondaryDonationPostData = Omit<WithoutId<SecondaryDonationData>, 'donatedAt'>;

export type SecondaryDonationFormData = Partial<SecondaryDonationPostData>;
