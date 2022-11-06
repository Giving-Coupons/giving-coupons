import { WithoutId } from './utils';

export type CharityMinimalData = {
  id: number;
  name: string;
};

export type CharityListData = CharityMinimalData & {
  logoUrl: string;
};

export type CharityData = CharityListData & {
  description: string;
  websiteUrl: string;
  imageUrl: string;
};

export type CharityFormData = Partial<CharityData>;

export type CharityPostData = WithoutId<CharityData>;

export type CharityPutData = CharityPostData;
