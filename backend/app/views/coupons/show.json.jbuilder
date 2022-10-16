# frozen_string_literal: true

json.partial! 'coupons/base', coupon: @coupon

json.campaign do
  json.partial! 'campaigns/base', campaign: @coupon.campaign
end

json.charities do
  json.array! @coupon.campaign.campaign_charities do |campaign_charity|
    json.partial! 'campaign_charities/base', campaign_charity: campaign_charity

    json.charity do
      json.partial! 'charities/charity', charity: campaign_charity.charity
    end

    json.partial! 'campaign_charities/donation', campaign_charity: campaign_charity
  end
end
