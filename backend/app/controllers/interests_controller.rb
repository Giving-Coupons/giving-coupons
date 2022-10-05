# frozen_string_literal: true

class InterestsController < ApplicationController
  before_action :set_interest, only: %i[show update destroy]

  wrap_parameters format: :json, include: %w[donorName donorEmail campaignName campaignDescription promisedAmount start
                                             end status couponDenomination charityIds]

  def index
    @interests = Interest.all
  end

  def show; end

  def create
    @interest = Interest.create!(interest_params)

    add_success_message "Interest for \"#{@interest.donor_name}\" successfully created!"
    render :show, status: :created, location: @interest
  end

  def update
    @interest.update!(interest_params)

    add_success_message "Interest for \"#{@interest.donor_name}\" successfully updated!"
    render :show, status: :ok, location: @interest
  end

  def destroy
    @interest.destroy!

    show_success_message "Interest for \"#{@interest.donor_name}\" successfully deleted!"
  end

  private

  def set_interest
    @interest = Interest.find(params[:id])
  end

  def interest_params
    permit = [:donor_name, :donor_email, :campaign_name, :campaign_description, :promised_amount, :start, :end, :status,
              :coupon_denomination, { charity_ids: [] }]

    params.require(:interest).permit(permit)
  end
end
