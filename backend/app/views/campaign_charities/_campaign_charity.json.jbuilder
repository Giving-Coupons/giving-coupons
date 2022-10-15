# frozen_string_literal: true

json.partial! 'campaign_charities/base', campaign_charity: campaign_charity
json.charity do
  json.partial! 'charities/charity', charity: campaign_charity.charity
end
