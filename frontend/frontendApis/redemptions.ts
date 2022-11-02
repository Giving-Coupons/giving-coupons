import { ApiPromise } from '../types/api';
import { CouponRedeemData } from '../types/coupons';
import { RedemptionPostData } from '../types/redemptions';
import BaseAPI from './base';

class RedemptionsAPI extends BaseAPI {
  static REDEMPTIONS_URL = 'redemptions';

  public addRedemption(redeemPostData: RedemptionPostData): ApiPromise<CouponRedeemData> {
    return this.post(`${RedemptionsAPI.REDEMPTIONS_URL}`, redeemPostData);
  }
}

export default RedemptionsAPI;
