import { Charity, charitySchema } from './charity';
import * as Yup from 'yup';
import { Moment } from 'moment';

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
  start: Moment;
  end: Moment;
  status: InterestStatus;
  charities: Charity[];
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

export const interestSchema = Yup.object({
  donorName: Yup.string().required('Donor name is required.'),
  donorEmail: Yup.string().required('Donor email is required.').email('Donor email is not in the correct form.'),
  campaignName: Yup.string().required('Campaign name is required.'),
  campaignDescription: Yup.string().required('Campaign description is required.'),
  promisedAmount: Yup.number()
    .required('Promised amount is required.')
    .typeError('Promised amount could not be parsed.')
    .integer('Promised amount must be an integer.')
    .positive('Promised amount must be a positive.')
    .min(100, 'Promised amount must be at least $100')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .when('couponDenomination', (couponDenomination: number, schema: any) => {
      return couponDenomination
        ? (schema as Yup.AnySchema).test({
            test: (promisedAmount) => promisedAmount % couponDenomination === 0,
            message: `Promised amount must be a multiple of $${couponDenomination}.`,
          })
        : schema;
    }),
  start: Yup.date().required('Start date is required.').typeError('Start date could not be parsed.'),
  end: Yup.date()
    .required('End date is required.')
    .typeError('End date could not be parsed.')
    .min(Yup.ref('start'), 'End date must be after start date.'),
  status: Yup.mixed().required().oneOf(Object.values(InterestStatus), 'Status could not be parsed.'),
  charities: Yup.array(charitySchema).required(),
  couponDenomination: Yup.number()
    .required('Coupon denomination is required.')
    .typeError('Coupon denomination must be a number.')
    .integer('Coupon denomination must be an integer.')
    .positive('Coupon denomination must be positive.'),
});
