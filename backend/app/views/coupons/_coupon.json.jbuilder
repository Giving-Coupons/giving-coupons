# frozen_string_literal: true

json.id coupon.id
json.urlToken coupon.url_token
json.isRedeemed coupon.redeemed?

# TODO: Create another partial that only contains the info that is needed for the coupon_controller clients
json.campaign do
  json.partial! 'campaigns/campaign', campaign: coupon.campaign
end
