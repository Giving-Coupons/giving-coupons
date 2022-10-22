# frozen_string_literal: true

json.primaryDonation do
  json.amount donation_breakdown[:primary_donor_amount]
  json.fraction donation_breakdown[:primary_donor_fraction]
end

json.secondaryDonation do
  json.amount donation_breakdown[:secondary_donors_amount]
  json.fraction donation_breakdown[:secondary_donors_fraction]
end
