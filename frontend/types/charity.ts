import * as Yup from 'yup';

export type Charity = {
  id: number;
};

export const charitySchema = Yup.object({ id: Yup.number().required() });
