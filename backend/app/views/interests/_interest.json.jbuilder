# frozen_string_literal: true

json.id interest.id
json.donorName interest.donor_name
json.donorEmail interest.donor_email
json.campaignName interest.campaign_name
json.campaignDescription interest.campaign_description
json.promisedAmount interest.promised_amount
json.start interest.start
json.end interest.end
json.status interest.status
json.couponDenomination interest.coupon_denomination
json.initialCouponValidity interest.initial_coupon_validity

json.charities interest.charities, partial: 'charities/charity', as: :charity
