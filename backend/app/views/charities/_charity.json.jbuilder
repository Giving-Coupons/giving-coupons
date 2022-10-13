# frozen_string_literal: true

json.id charity.id
json.name charity.name
json.description charity.description
json.websiteUrl charity.website_url
json.logoBase64 encoded_file_data_url(charity.logo)
json.imageBase64 encoded_file_data_url(charity.image)
