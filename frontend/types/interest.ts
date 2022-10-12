import { CharityMinimalData } from './charity';

export enum InterestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type Interest = {
  id: number;
  donorName: string;
  donorEmail: string;
  campaignName: string;
  campaignDescription: string;
  promisedAmount: number;
  start: Date;
  end: Date;
  status: InterestStatus;
  charities: CharityMinimalData[];
  couponDenomination: number;
};

export type InterestPostData = Omit<Interest, 'id' | 'start' | 'end' | 'charities'> & {
  start: string;
  end: string;
  charityIds: number[];
};
export type InterestPutData = InterestPostData;
export type InterestData = Omit<Interest, 'start' | 'end'> & {
  start: string;
  end: string;
};
