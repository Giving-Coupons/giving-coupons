import { Nullable } from './utils';

export interface AdminData {
  id: number;
  username: string;
}

export type AdminLoginData = {
  username: string;
  password: string;
};

export type AdminPostData = {
  username: string;
  password: string;
  passwordConfirmation: string;
  masterPassword: string;
};

export type AdminValidateData =
  | {
      success: true;
      data: {
        id: number;
        username: string;
        uid: string; // same as username

        // Not in use:
        email: Nullable<string>;
        allow_password_change: boolean;
        provider: string;
      };
    }
  | {
      success: false;
      errors: string[]; // Typical: ['Invalid login credentials']
    };
