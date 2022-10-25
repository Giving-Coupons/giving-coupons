import { ApiPromise } from '../types/api';
import { CouponBaseData, CouponProgressData, CouponRedeemData, CouponRedeemPostData } from '../types/coupons';
import { SecondaryDonationPostData } from '../types/donations';
import BaseAPI from './base';

class CouponsAPI extends BaseAPI {
  static COUPONS_URL = 'coupons';

  public listCampaignUnredeemed(campaignId: number): ApiPromise<CouponBaseData[]> {
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

  public redeemCoupon(redeemPostData: CouponRedeemPostData): ApiPromise<SecondaryDonationPostData> {
    return this.post(`${CouponsAPI.COUPONS_URL}/redeem`, redeemPostData);
  }
}

export default CouponsAPI;
