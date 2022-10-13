# frozen_string_literal: true

json.array! @charities do |charity|
  json.id charity.id
  json.name charity.name
  json.logoBase64 encoded_file_data_url(charity.logo.attachment)
end
