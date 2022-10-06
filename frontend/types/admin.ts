import { object, string, InferType } from 'yup';

export interface AdminData {
  id: number;
  username: string;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

export const adminPostDataSchema = object({
  username: string().required(),
  password: string().required().min(6, `The new user's password must be at least 6 characters long.`),
  passwordConfirmation: string().required(),
  masterPassword: string().required(),
});

export type AdminPostData = InferType<typeof adminPostDataSchema>;
