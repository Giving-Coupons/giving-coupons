import { ApiPromise } from '../types/api';
import { CouponBaseData, CouponRedeemData, CouponRedeemPostData } from '../types/coupons';
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

  public getProgress(urlToken: string): ApiPromise<string> {
    return this.get(`${CouponsAPI.COUPONS_URL}/progress`);
  }

  public setProgress(urlToken: string, jsonProgress: string): ApiPromise<string> {
    return this.put(`${CouponsAPI.COUPONS_URL}/progress`, { jsonProgress });
  }

  public redeemCoupon(redeemPostData: CouponRedeemPostData): ApiPromise<SecondaryDonationPostData> {
    return this.post(`${CouponsAPI.COUPONS_URL}/redeem`, redeemPostData);
  }
}

export default CouponsAPI;
