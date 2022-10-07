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
  couponDenomination: number;
};
