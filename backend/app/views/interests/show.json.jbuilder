# frozen_string_literal: true

json.partial! 'interests/interest', interest: @interest
json.campaignImageUrl @interest.campaign_image_url
json.donorImageUrl @interest.donor_image_url
