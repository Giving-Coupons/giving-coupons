import { ApiPromise } from '../types/api';
import { CouponDownloadData, CouponProgressData, CouponRedeemData } from '../types/coupons';
import BaseAPI from './base';

class CouponsAPI extends BaseAPI {
  static COUPONS_URL = 'coupons';

  public listCampaignUnredeemed(campaignId: number): ApiPromise<CouponDownloadData[]> {
    return this.get(`${CouponsAPI.COUPONS_URL}/campaign/${campaignId}/unredeemed`);
  }

  public getCoupon(urlToken: string): ApiPromise<CouponRedeemData> {
    return this.get(`${CouponsAPI.COUPONS_URL}/${urlToken}`);
  }

  public getProgress(urlToken: string): ApiPromise<CouponProgressData> {
    return this.get(`${CouponsAPI.COUPONS_URL}/${urlToken}/progress`);
  }

  public setProgress(urlToken: string, progress: string): ApiPromise<string> {
    return this.put(`${CouponsAPI.COUPONS_URL}/${urlToken}/progress`, { progress });
  }
}

export default CouponsAPI;
