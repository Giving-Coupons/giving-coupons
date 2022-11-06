# frozen_string_literal: true

json.array! @charities do |charity|
  json.id charity.id
  json.name charity.name
  json.logoUrl charity.logo_url
end
