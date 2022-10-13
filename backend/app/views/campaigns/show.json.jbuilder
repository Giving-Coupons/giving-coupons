# frozen_string_literal: true

json.partial! 'campaigns/base', campaign: @campaign

json.donations do
  json.partial! 'secondary_donations/breakdown', donation_breakdown: @campaign.donation_breakdown
end

json.charities [] # ignore the charities from the base partial, since Jbuilder merges instead of overwriting
json.charities do
  json.array! @campaign.campaign_charities, partial: 'campaign_charities/donation_public', as: :campaign_charity
end
