# frozen_string_literal: true

json.partial! 'charities/minimal', charity: charity
json.logoBase64 encoded_file_data_url(charity.logo)
