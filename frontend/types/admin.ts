import { ref, object, string, InferType } from 'yup';

export interface AdminData {
  id: number;
  username: string;
}

export const adminLoginDataSchema = object({
  username: string().required(),
  password: string().required(),
});

export type AdminLoginData = InferType<typeof adminLoginDataSchema>;

export const adminPostDataSchema = object({
  username: string().required(),
  password: string().required().min(6, `The new user's password must be at least 6 characters long.`),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password'), null], 'Passwords must match'),
  masterPassword: string().required(),
});

export type AdminPostData = InferType<typeof adminPostDataSchema>;
