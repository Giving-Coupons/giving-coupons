# frozen_string_literal: true

json.partial! 'coupons/base', coupon: coupon

if coupon.campaign_charity.present?
  json.charity do
    json.partial! 'charities/minimal', charity: coupon.campaign_charity.charity
  end
else
  json.charity nil
end

if coupon.secondary_donation.present?
  json.secondaryDonation do
    json.partial! 'secondary_donations/secondary_donation', secondary_donation: coupon.secondary_donation
  end
else
  json.secondaryDonation nil
end

if coupon.redemption.present?
  json.redemption do
    json.partial! 'redemptions/minimal', redemption: coupon.redemption
  end
else
  json.redemption nil
end
