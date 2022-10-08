type CharityId = number;

// Charity model is TBD, this is all that exists right now.
type Charity = { id: number };

export enum InterestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type InterestWithoutId = {
  donorName: string;
  donorEmail: string;
  campaignName: string;
  campaignDescription: string;
  promisedAmount: number;
  start: Date;
  end: Date;
  status: InterestStatus;
  charities: Charity[];
  couponDenomination: number;
};

export type Interest = InterestWithoutId & { id: number };

// The following types are used in the API request / response.
export type InterestPostData = Omit<InterestWithoutId, 'start' | 'end' | 'charities'> & {
  start: string;
  end: string;
  charityIds: CharityId[];
};
export type InterestPatchData = InterestPostData;
export type InterestData = Omit<Interest, 'start' | 'end'> & {
  start: string;
  end: string;
};
