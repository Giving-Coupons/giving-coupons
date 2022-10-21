# frozen_string_literal: true

json.partial! 'interests/interest', interest: @interest
json.imageBase64 encoded_file_data_url(@interest.image)
