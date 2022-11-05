# frozen_string_literal: true

class CouponsController < ApplicationController
  before_action :authenticate_admin!, except: %i[show progress update_progress]

  def index
    @coupons = Coupon.all.includes({ secondary_donation: { campaign_charity: :charity } })
  end

  def campaign_unredeemed
    @coupons = Coupon.all
                     .where(campaign_id: params[:campaign_id])
                     .filter { |coupon| !coupon.redeemed? && !coupon.expired? }
  end

  def show
    @coupon = Coupon.includes([{ redemption: { campaign_charity: [charity: { logo_attachment: :blob,
                                                                             image_attachment: :blob }] } },
                               { campaign: [{ campaign_charities: [:secondary_donations, :coupons,
                                                                   { charity: { logo_attachment: :blob,
                                                                                image_attachment: :blob } }] },
                                            { primary_donor: [image_attachment: :blob] },
                                            { image_attachment: :blob }] }])
                    .find_by!(url_token: params[:id])
  end

  def progress
    @coupon = Coupon.find_by!(url_token: params[:url_token])
  end

  def update_progress
    @coupon = Coupon.find_by!(url_token: params[:url_token])
    @coupon.update!(progress: params[:progress])

    render 'progress', status: :ok
  end
end
