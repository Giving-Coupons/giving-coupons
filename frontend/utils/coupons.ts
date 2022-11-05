import { CouponRedeemData } from '../types/coupons';
import { isNowBetweenInclusive } from './dates';

export const isCouponRedeemable = (coupon: CouponRedeemData): boolean => {
  const hasCouponExpired = coupon.expiresAt.isBefore();
  const hasBeenRedeemed = coupon.redemption;
  const isCampaignActive = isNowBetweenInclusive(coupon.campaign.start, coupon.campaign.end);

  return !hasCouponExpired && !hasBeenRedeemed && isCampaignActive;
};
