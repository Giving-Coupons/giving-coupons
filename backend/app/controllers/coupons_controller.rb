# frozen_string_literal: true

class CouponsController < ApplicationController
  before_action :authenticate_admin!, except: %i[show redeem progress update_progress]

  def index
    @coupons = Coupon.all.includes({ secondary_donation: { campaign_charity: :charity } })
  end

  def campaign_unredeemed
    @coupons = Coupon.all.includes(:secondary_donation)
                     .where(campaign_id: params[:campaign_id])
                     .where(secondary_donations: { id: nil })
  end

  def show
    @coupon = Coupon.includes([:secondary_donation,
                               { campaign: [{ campaign_charities: [:secondary_donations, :coupons,
                                                                   { charity: { logo_attachment: :blob,
                                                                                image_attachment: :blob } }] },
                                            { primary_donor: [image_attachment: :blob] },
                                            { image_attachment: :blob }] },
                               { campaign_charity: [charity: { logo_attachment: :blob,
                                                               image_attachment: :blob }] }])
                    .find_by(url_token: params[:id])
  end

  def redeem
    @coupon = Coupon.find_by(url_token: params[:url_token])

    if @coupon.redeemed?
      add_error_message('Coupon is already redeemed!')
      render 'layouts/empty', status: :bad_request
      return
    end

    @coupon.assign_attributes(redeem_params)

    if params[:amount].positive?
      @coupon.build_secondary_donation(campaign_charity_id: params[:campaign_charity_id],
                                       amount: params[:amount])
    end

    @coupon.save!
    render 'show', status: :created
  end

  def progress
    @coupon = Coupon.find_by!(url_token: params[:url_token])
  end

  def update_progress
    @coupon = Coupon.find_by!(url_token: params[:url_token])
    @coupon.update!(progress: params[:progress])

    render 'progress', status: :ok
  end

  private

  def redeem_params
    params.require(:coupon).permit(:campaign_charity_id)
  end
end
