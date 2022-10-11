# frozen_string_literal: true

json.array! @coupons, partial: 'coupons/coupon', as: :coupon
