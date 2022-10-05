import { AdminData, AdminLoginData, AdminPostData } from '../types/admin';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class AdminAPI extends BaseAPI {
  protected static AUTH_URL = 'auth';

  public registerNewAdmin(adminPostData: AdminPostData): ApiPromise<AdminData> {
    return this.post(AdminAPI.AUTH_URL, adminPostData);
  }

  public loginAdmin(adminLoginData: AdminLoginData): ApiPromise<AdminData> {
    return this.post(`${AdminAPI.AUTH_URL}/sign_in`, adminLoginData);
  }

  public logoutAdmin(): ApiPromise<void> {
    return this.delete(`${AdminAPI.AUTH_URL}/sign_out`);
  }
}

export default AdminAPI;
