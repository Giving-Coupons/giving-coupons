import { CharityMinimalData } from './charity';
import { Moment } from 'moment';

export enum InterestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type InterestData = {
  id: number;
  donorName: string;
  donorEmail: string;
  donorImageBase64: string;
  campaignName: string;
  campaignDescription: string;
  campaignImageBase64: string;
  promisedAmount: number;
  start: Moment;
  end: Moment;
  status: InterestStatus;
  charities: CharityMinimalData[];
  couponDenomination: number;
};

export type InterestPostData = Omit<InterestData, 'id' | 'charities'> & {
  charityIds: number[];
};

export type InterestPutData = InterestPostData;
