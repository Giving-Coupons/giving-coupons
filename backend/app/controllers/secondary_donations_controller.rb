# frozen_string_literal: true

class SecondaryDonationsController < ApplicationController
  before_action :authenticate_admin!, except: %i[create]
  wrap_parameters format: :json, include: %w[amount couponId campaignCharityId]

  def index
    @secondary_donations = SecondaryDonation.all
  end

  def create
    @secondary_donation = SecondaryDonation.create!(secondary_donation_params)

    add_success_message('Donation successfully created!')
  end

  private

  def secondary_donation_params
    params.require(:secondary_donation).permit(:amount, :coupon_id, :campaign_charity_id)
  end
end
