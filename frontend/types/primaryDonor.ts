import { WithoutId } from './utils';

export type PrimaryDonorData = {
  id: number;
  name: string;
  email: string;
};

export type PrimaryDonorPostData = WithoutId<PrimaryDonorData>;

export type PrimaryDonorPutData = WithoutId<PrimaryDonorData>;
