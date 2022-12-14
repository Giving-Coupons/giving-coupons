# frozen_string_literal: true

json.array! @campaigns do |campaign|
  json.id campaign.id
  json.name campaign.name
  json.description campaign.description
  json.imageUrl campaign.image_url
  json.primaryDonorName campaign.primary_donor.name
  json.start campaign.start
  json.end campaign.end

  json.charities do
    json.array! campaign.charities, partial: 'charities/list', as: :charity
  end

  json.donations do
    json.partial! 'secondary_donations/breakdown', donation_breakdown: campaign.donation_breakdown
  end

  json.couponsRedeemedCount campaign.num_redeemed_coupons
end
