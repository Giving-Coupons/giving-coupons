# frozen_string_literal: true

json.partial! 'coupons/base', coupon: @coupon

json.campaign do
  json.partial! 'campaigns/base', campaign: @coupon.campaign
end

if @coupon.campaign_charity.present?
  json.campaignCharity do
    json.partial! 'campaign_charities/campaign_charity', campaign_charity: @coupon.campaign_charity
  end
else
  json.campaignCharity nil
end

if @coupon.secondary_donation.present?
  json.secondaryDonation do
    json.partial! 'secondary_donations/secondary_donation', secondary_donation: @coupon.secondary_donation
  end
else
  json.secondaryDonation nil
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
