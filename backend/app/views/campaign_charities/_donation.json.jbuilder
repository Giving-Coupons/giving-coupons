# frozen_string_literal: true

json.partial! 'campaign_charities/campaign_charity', campaign_charity: campaign_charity
json.partial! 'secondary_donations/breakdown', donation_breakdown: campaign_charity.donation_breakdown
json.primaryDonor do
  json.partial! 'primary_donors/primary_donor', primary_donor: campaign_charity.campaign.primary_donor
end
