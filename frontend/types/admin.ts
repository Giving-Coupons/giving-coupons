export interface AdminData {
  id: number;
  username: string;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

export interface AdminPostData {
  username: string;
  password: string;
  passwordConfirmation: string;
  masterPassword: string;
}
