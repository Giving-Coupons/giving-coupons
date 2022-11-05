# frozen_string_literal: true

json.partial! 'coupons/base', coupon: coupon

if coupon.redemption.present?
  json.redemption do
    json.partial! 'redemptions/minimal', redemption: coupon.redemption
  end
else
  json.redemption nil
end
