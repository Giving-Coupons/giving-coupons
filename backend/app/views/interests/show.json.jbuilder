# frozen_string_literal: true

json.partial! 'interests/interest', interest: @interest
json.campaignImageBase64 encoded_file_data_url(@interest.campaign_image)
json.donorImageBase64 encoded_file_data_url(@interest.donor_image)
