# frozen_string_literal: true

json.array! @campaigns do |campaign|
  json.id campaign.id
  json.name campaign.name
  json.description campaign.description
  json.imageBase64 encoded_file_data_url(campaign.image)

  json.charities do
    json.array! campaign.charities, partial: 'charities/list', as: :charity
  end

  json.donations do
    json.partial! 'secondary_donations/breakdown', donation_breakdown: campaign.donation_breakdown
  end

  json.couponsRedeemedCount campaign.num_redeemed_coupons
end
