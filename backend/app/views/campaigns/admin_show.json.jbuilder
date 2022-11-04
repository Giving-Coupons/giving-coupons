# frozen_string_literal: true

json.partial! 'campaigns/base', campaign: @campaign

json.donations do
  json.partial! 'secondary_donations/breakdown', donation_breakdown: @campaign.donation_breakdown
end

json.charities [] # ignore the charities from the base partial, since Jbuilder merges instead of overwriting
json.charities do
  json.array! @campaign.campaign_charities, partial: 'campaign_charities/donation', as: :campaign_charity
end

json.coupons do
  json.array! @campaign.coupons, partial: 'coupons/list', as: :coupon
end

json.nonCouponDonations do
  json.array! (@campaign.secondary_donations - @campaign.coupons.map(&:secondary_donation).compact), partial: 'secondary_donations/secondary_donation', as: :secondary_donation
end
