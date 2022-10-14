# frozen_string_literal: true

class CouponsController < ApplicationController
  # before_action :authenticate_admin!
  before_action :set_coupon, only: [:show]

  def index
    @coupons = Coupon.all.includes({ secondary_donation: { campaign_charity: :charity } })
  end

  def unredeemed
    @coupons = Coupon.all.includes(:secondary_donation).where(secondary_donations: { id: nil })
  end

  def show; end

  private

  def set_coupon
    @coupon = Coupon.find(params[:id])
  end
end
