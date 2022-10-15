import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { CouponBaseData } from '../types/coupons';

class CouponsAPI extends BaseAPI {
  static COUPONS_URL = 'coupons';

  public listCampaignUnredeemed(campaignId: number): ApiPromise<CouponBaseData[]> {
    return this.get(`${CouponsAPI.COUPONS_URL}/campaign/${campaignId}/unredeemed`);
  }
}

export default CouponsAPI;
