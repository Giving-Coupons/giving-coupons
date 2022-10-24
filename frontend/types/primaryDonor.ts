import { WithoutId } from './utils';

export type PrimaryDonorData = {
  id: number;
  name: string;
  email: string;
  imageBase64: string;
};

export type PrimaryDonorPostData = WithoutId<PrimaryDonorData>;

export type PrimaryDonorPutData = WithoutId<PrimaryDonorData>;

export type CouponSponsorship = {
  primaryDonor: PrimaryDonorData;
  couponDenomination: number;
};
