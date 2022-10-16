import { ApiPromise } from '../types/api';
import { CouponBaseData, CouponRedeemData } from '../types/coupons';
import BaseAPI from './base';

class CouponsAPI extends BaseAPI {
  static COUPONS_URL = 'coupons';

  public listCampaignUnredeemed(campaignId: number): ApiPromise<CouponBaseData[]> {
    return this.get(`${CouponsAPI.COUPONS_URL}/campaign/${campaignId}/unredeemed`);
  }

  public getCoupon(urlToken: string): ApiPromise<CouponRedeemData> {
    return this.get(`${CouponsAPI.COUPONS_URL}/${urlToken}`);
  }
}

export default CouponsAPI;
