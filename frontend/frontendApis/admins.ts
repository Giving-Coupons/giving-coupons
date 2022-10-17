import { AdminData, AdminLoginData, AdminPostData, AdminValidateData } from '../types/admin';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class AdminsAPI extends BaseAPI {
  protected static AUTH_URL = 'auth';

  public validateToken(): ApiPromise<AdminValidateData> {
    return this.get(`${AdminsAPI.AUTH_URL}/validate_token`);
  }

  public registerNewAdmin(adminPostData: AdminPostData): ApiPromise<AdminData> {
    return this.post(AdminsAPI.AUTH_URL, adminPostData);
  }

  public loginAdmin(adminLoginData: AdminLoginData): ApiPromise<AdminData> {
    return this.post(`${AdminsAPI.AUTH_URL}/sign_in`, adminLoginData);
  }

  public logoutAdmin(): ApiPromise<void> {
    return this.delete(`${AdminsAPI.AUTH_URL}/sign_out`);
  }
}

export default AdminsAPI;
