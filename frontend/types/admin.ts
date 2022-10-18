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
