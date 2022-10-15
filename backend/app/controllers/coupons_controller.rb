# frozen_string_literal: true

class CouponsController < ApplicationController
  before_action :authenticate_admin!, except: [:show]

  def index
    @coupons = Coupon.all.includes({ secondary_donation: { campaign_charity: :charity } })
  end

  def campaign_unredeemed
    @coupons = Coupon.all.includes(:secondary_donation)
                     .where(campaign_id: params[:campaign_id])
                     .where(secondary_donations: { id: nil })
  end

  def show
    @coupon = Coupon.includes({ campaign: [{ campaign_charities: :charity },
                                           :primary_donor] }).find_by(url_token: params[:id])
  end
end
