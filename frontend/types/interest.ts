import { Moment } from 'moment';
import { CharityMinimalData } from './charity';

export enum InterestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type InterestData = {
  id: number;
  donorName: string;
  donorEmail: string;
  donorImageUrl: string;
  campaignName: string;
  campaignDescription: string;
  campaignImageUrl: string;
  promisedAmount: number;
  start: Moment;
  end: Moment;
  status: InterestStatus;
  charities: CharityMinimalData[];
  couponDenomination: number;
  initialCouponValidity: number;
};

export type InterestPostData = Omit<InterestData, 'id' | 'charities'> & {
  charityIds: number[];
};

export type InterestPutData = InterestPostData;
