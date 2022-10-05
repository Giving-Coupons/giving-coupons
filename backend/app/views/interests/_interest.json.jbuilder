# frozen_string_literal: true

json.key_format! camelize: :lower
json.extract! interest, :id, :donor_name, :donor_email, :campaign_name, :campaign_description, :promised_amount,
              :start, :end, :status, :coupon_denomination
json.charities interest.charities, partial: 'charities/charity', as: :charity
