# frozen_string_literal: true

class InterestsController < ApplicationController
  before_action :authenticate_admin!, only: %i[index show update reject destroy]
  before_action :set_interest, only: %i[show update reject destroy]

  def index
    @interests = Interest.includes(charities: [logo_attachment: :blob, image_attachment: :blob]).all
  end

  def show; end

  def create
    @interest = Interest.new(interest_params)
    @interest.charity_ids = params[:charity_ids]
    @interest.campaign_image.attach(data: params[:campaign_image_base64]) if params[:campaign_image_base64].present?
    @interest.donor_image.attach(data: params[:donor_image_base64]) if params[:donor_image_base64].present?
    @interest.save!

    add_success_message "Interest form for \"#{@interest.donor_name}\" successfully submitted!"
    render :show, status: :created, location: @interest
  end

  def update
    @interest.assign_attributes(interest_params)
    @interest.charity_ids = params[:charity_ids]
    @interest.save!

    add_success_message "Interest for \"#{@interest.donor_name}\" successfully updated!"
    render :show, status: :ok, location: @interest
  end

  def reject
    return unless can_update_status?

    @interest.reject

    add_success_message "Interest for \"#{@interest.donor_name}\" successfully rejected!"
    render :show, status: :ok, location: @interest
  end

  def destroy
    @interest.destroy!

    add_success_message "Interest for \"#{@interest.donor_name}\" successfully deleted!"
    render :show, status: :ok
  end

  private

  def set_interest
    @interest = Interest.includes(campaign_image_attachment: :blob, donor_image_attachment: :blob,
                                  charities: [logo_attachment: :blob, image_attachment: :blob]).find(params[:id])
  end

  def interest_params
    permitted_params = %i[donor_name donor_email campaign_name campaign_description promised_amount
                          start end status coupon_denomination]

    params.require(:interest).permit(permitted_params)
  end

  def can_update_status?
    can_update = @interest.pending?

    unless can_update
      add_error_message "This interest has already been #{@interest.status}!"
      render :show, status: :bad_request, location: @interest
    end

    can_update
  end
end
