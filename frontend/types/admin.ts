import { ref, object, string, InferType } from 'yup';

export interface AdminData {
  id: number;
  username: string;
}

export const adminLoginDataSchema = object({
  username: string().required('Username is a required field.'),
  password: string().required('Password is a required field.'),
});

export type AdminLoginData = InferType<typeof adminLoginDataSchema>;

export const adminPostDataSchema = object({
  username: string().required('Username is a required field.'),
  password: string()
    .required('Password is a required field.')
    .min(6, `The new user's password must be at least 6 characters long.`),
  passwordConfirmation: string()
    .required('Password confirmation is a required field.')
    .oneOf([ref('password'), null], 'Passwords must match'),
  masterPassword: string().required('Master password is a required field.'),
});

export type AdminPostData = InferType<typeof adminPostDataSchema>;
