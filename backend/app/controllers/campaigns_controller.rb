# frozen_string_literal: true

class CampaignsController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_campaign, only: %i[show admin_show update destroy]

  wrap_parameters format: :json,
                  include: %w[name description promisedAmount start end primaryDonorId
                              couponDenomination charityIds]

  def index
    @campaigns = Campaign.all
  end

  def show; end

  def admin_show; end

  def create
    @campaign = Campaign.create!(campaign_params)

    add_success_message "Campaign \"#{@campaign.name}\" successfully created!"
    render :show, status: :created, location: @campaign
  end

  def update
    @campaign.update!(campaign_params)

    add_success_message "Campaign \"#{@campaign.name}\" successfully updated!"
    render :show, status: :ok, location: @campaign
  end

  def destroy
    @campaign.destroy!

    add_success_message "Campaign \"#{@campaign.name}\" successfully deleted!"
    render :show, status: :ok, location: @campaign
  end

  private

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end

  def campaign_params
    permitted_params = [:name, :description, :promised_amount, :start, :end, :primary_donor_id,
                        :coupon_denomination, { charity_ids: [] }]

    params.require(:campaign).permit(permitted_params)
  end
end
