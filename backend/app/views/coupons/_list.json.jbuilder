# frozen_string_literal: true

json.partial! 'coupons/base', coupon: coupon

if coupon.secondary_donation.present?
  json.secondaryDonation do
    json.partial! 'secondary_donations/secondary_donation', secondary_donation: coupon.secondary_donation
  end

  json.charity do
    json.partial! 'charities/minimal', charity: coupon.secondary_donation.campaign_charity.charity
  end
else
  json.secondaryDonation nil
  json.charity nil
end
