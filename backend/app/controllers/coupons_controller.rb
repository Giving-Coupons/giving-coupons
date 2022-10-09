# frozen_string_literal: true

class CouponsController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_coupon, only: %i[show update destroy]

  wrap_parameters format: :json,
                  include: %w[campaignId urlToken]

  def index
    @coupons = Coupon.all
  end

  def show; end

  def create
    add_error_message('Coupons cannot be created manually!')
    render 'layouts/empty', status: :bad_request
  end

  def update
    @coupon.update!(coupon_params)

    add_success_message "Coupon with token \"#{@coupon.url_token}\" successfully updated!"
    render :show, status: :ok, location: @coupon
  end

  def destroy
    @coupon.destroy!

    add_success_message "Coupon with token \"#{@coupon.url_token}\" successfully deleted!"
    render :show, status: :ok, location: @coupon
  end

  private

  def set_coupon
    @coupon = Coupon.find(params[:id])
  end

  def coupon_params
    params.require(:coupon).permit(:campaign_id, :url_token)
  end
end
