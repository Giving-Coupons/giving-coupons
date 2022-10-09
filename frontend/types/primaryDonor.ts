import { WithoutId } from './utils';

export type PrimaryDonor = {
  id: number;
  name: string;
  email: string;
};

export type PrimaryDonorPostData = WithoutId<PrimaryDonor>;

export type PrimaryDonorPutData = WithoutId<PrimaryDonor>;
