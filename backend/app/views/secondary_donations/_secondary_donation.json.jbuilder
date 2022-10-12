# frozen_string_literal: true

json.id secondary_donation.id
json.amount secondary_donation.amount

if secondary_donation.coupon
  json.coupon do
    json.partial! 'coupons/coupon', coupon: secondary_donation.coupon
  end
else
  json.coupon nil
end

json.charity do
  json.partial! 'charities/charity', charity: secondary_donation.campaign_charity.charity
end