# frozen_string_literal: true

json.id campaign.id
json.name campaign.name
json.description campaign.description
json.promisedAmount campaign.promised_amount
json.start campaign.start
json.end campaign.end
json.imageBase64 encoded_file_data_url(campaign.image)

json.charities campaign.campaign_charities do |campaign_charity|
  json.partial! 'campaign_charities/base', campaign_charity: campaign_charity
end

json.primaryDonor do
  json.partial! 'primary_donors/primary_donor', primary_donor: campaign.primary_donor
end

json.interestId campaign.interest_id
