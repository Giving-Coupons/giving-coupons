# frozen_string_literal: true

json.id campaign.id
json.name campaign.name
json.description campaign.description
json.promised_amount campaign.promised_amount
json.start campaign.start
json.end campaign.end
json.couponDenomination campaign.coupon_denomination
json.image encoded_file_data_url(campaign.image.attachment)

json.primaryDonor do
  json.partial! 'primary_donors/primary_donor', primary_donor: campaign.primary_donor
end
