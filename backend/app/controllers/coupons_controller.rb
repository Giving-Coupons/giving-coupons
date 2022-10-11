# frozen_string_literal: true

class CouponsController < ApplicationController
  before_action :authenticate_admin!

  def index
    @coupons = Coupon.all
  end

  def unredeemed
    @coupons = Coupon.all.reject(&:redeemed?)

    render :index, status: :ok
  end
end
