import { WithoutId } from './utils';
import { CampaignPostData } from './campaigns';

export type CharityMinimalData = {
  id: number;
  name: string;
};

export type CharityListData = CharityMinimalData & {
  logoBase64: string;
};

export type CharityData = CharityListData & {
  description: string;
  websiteUrl: string;
  imageBase64: string;
};

export type CharityPostData = WithoutId<CharityData>;

export type CharityPutData = CampaignPostData;
