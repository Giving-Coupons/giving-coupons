# frozen_string_literal: true

json.id primary_donor.id
json.name primary_donor.name
json.email primary_donor.email
json.imageBase64 encoded_file_data_url(primary_donor.image)
