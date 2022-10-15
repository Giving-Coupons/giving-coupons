# frozen_string_literal: true

json.array! @coupons, partial: 'coupons/list', as: :coupon
