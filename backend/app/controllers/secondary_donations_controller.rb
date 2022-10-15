# frozen_string_literal: true

class SecondaryDonationsController < ApplicationController
  before_action :authenticate_admin!, except: %i[create]
  wrap_parameters format: :json, include: %w[amount urlToken campaignCharityId]

  def index
    @secondary_donations = SecondaryDonation.all
  end

  def create
    @secondary_donation = SecondaryDonation.new(secondary_donation_params)
    @secondary_donation.coupon = Coupon.find_by(url_token: params[:url_token])
    @secondary_donation.save!

    add_success_message('Donation successfully created!')
  end

  private

  def secondary_donation_params
    params.require(:secondary_donation).permit(:amount, :campaign_charity_id)
  end
end
