# frozen_string_literal: true

json.extract! coupon, :id, :created_at, :updated_at
json.url coupon_url(coupon, format: :json)
