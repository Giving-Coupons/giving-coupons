# frozen_string_literal: true

json.id secondary_donation.id
json.amount secondary_donation.amount
json.campaignCharityId secondary_donation.campaign_charity_id

if secondary_donation.coupon
  json.urlToken secondary_donation.coupon.url_token
else
  json.urlToken nil
end
