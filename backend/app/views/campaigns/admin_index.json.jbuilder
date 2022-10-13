# frozen_string_literal: true

json.array! @campaigns do |campaign|
  json.id campaign.id
  json.name campaign.name
  json.promisedAmount campaign.promised_amount
  json.start campaign.start
  json.end campaign.end
  json.primaryDonor do
    json.id campaign.primary_donor.id
    json.name campaign.primary_donor.name
  end
end
