# frozen_string_literal: true

class RedemptionsController < ApplicationController
  def create
    @coupon = Coupon.find_by(url_token: params[:url_token])

    if @coupon.redeemed?
      add_error_message('Coupon is already redeemed!')
      render 'layouts/empty', status: :bad_request
      return
    end

    @redemption = Redemption.new(campaign_charity_id: params[:campaign_charity_id],
                                 coupon: @coupon,
                                 redeemed_at: DateTime.now)

    if params[:amount].positive?
      @redemption.build_secondary_donation(campaign_charity_id: params[:campaign_charity_id],
                                           amount: params[:amount])
    end

    @redemption.save!

    render 'coupons/show', status: :created
  end
end
