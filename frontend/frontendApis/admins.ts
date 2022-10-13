import { AdminData, AdminLoginData, AdminPostData } from '../types/admin';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class AdminsAPI extends BaseAPI {
  protected static AUTH_URL = 'auth';

  public registerNewAdmin(adminPostData: AdminPostData): ApiPromise<AdminData> {
    return this.post(AdminsAPI.AUTH_URL, adminPostData);
  }

  public loginAdmin(adminLoginData: AdminLoginData): ApiPromise<AdminData> {
    return this.post(`${AdminsAPI.AUTH_URL}/sign_in`, adminLoginData)
      .then((x) => {
        console.dir({ x, inAdminApi: 'isResponse' });
        return x;
      })
      .catch((x) => {
        console.dir({ x, inAdminApi: 'isError' });
        throw x;
      }) as ApiPromise<AdminData>;
  }

  public logoutAdmin(): ApiPromise<void> {
    return this.delete(`${AdminsAPI.AUTH_URL}/sign_out`);
  }
}

export default AdminsAPI;
