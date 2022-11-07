# frozen_string_literal: true

# json.array! @coupons, partial: 'coupons/base', as: :coupon
json.array! @coupons do |coupon|
  json.partial! 'coupons/base', coupon: coupon

  json.primaryDonor do
    json.partial! 'primary_donors/primary_donor', primary_donor: coupon.campaign.primary_donor
  end
end
