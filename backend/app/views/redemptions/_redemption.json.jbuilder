# frozen_string_literal: true

json.redeemedAt redemption.redeemed_at

json.campaignCharity do
  json.partial! 'campaign_charities/campaign_charity', campaign_charity: redemption.campaign_charity
end

if redemption.secondary_donation.present?
  json.secondaryDonation do
    json.partial! 'secondary_donations/secondary_donation', secondary_donation: redemption.secondary_donation
  end
else
  json.secondaryDonation nil
end
