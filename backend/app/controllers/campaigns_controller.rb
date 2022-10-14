# frozen_string_literal: true

class CampaignsController < ApplicationController
  before_action :authenticate_admin!, except: %i[index show]
  before_action :set_campaign, only: %i[show admin_show update destroy]

  def index
    scope = Campaign.all

    scope = scope.contains(params[:name]) if params[:name].present?

    starts_before = params[:starts_before]
    starts_after = params[:starts_after]
    ends_before = params[:ends_before]
    ends_after = params[:ends_after]

    scope = scope.starts_before(starts_before).starts_after(starts_after)
                 .ends_before(ends_before).ends_after(ends_after)

    return scope if starts_before.present? || starts_after.present? || ends_before.present? || ends_after.present?

    is_active = params[:is_active]
    is_upcoming = params[:is_upcoming]
    is_completed = params[:is_completed]
    status_scoped = Campaign.active(is_active).or(Campaign.upcoming(is_upcoming)).or(Campaign.completed(is_completed))

    @campaigns = scope.merge(status_scoped)
  end

  def admin_index
    @campaigns = filter
  end

  def show; end

  def admin_show; end

  def create
    @campaign = Campaign.new(campaign_params)

    set_donor
    create_campaign_charities

    @campaign.image.attach(data: params[:image_base64]) if params[:image_base64].present?

    @campaign.save!

    add_success_message "Campaign \"#{@campaign.name}\" successfully created!"
    render :response, status: :created, location: @campaign
  end

  def update
    @campaign.assign_attributes(campaign_params)

    set_donor
    create_or_update_campaign_charities

    if params[:image_base64].nil?
      @campaign.image.purge
    else
      @campaign.image.attach(data: params[:image_base64])
    end

    @campaign.save!

    add_success_message "Campaign \"#{@campaign.name}\" successfully updated!"
    render :response, status: :ok, location: @campaign
  end

  def destroy
    @campaign.destroy!

    add_success_message "Campaign \"#{@campaign.name}\" successfully deleted!"
    render :response, status: :ok, location: @campaign
  end

  private

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end

  def campaign_params
    top_level_params = %i[charities primary_donor]
    params.require(top_level_params)

    campaign_params = %i[name description promised_amount start end coupon_denomination]
    params.require(:campaign).permit(campaign_params)
  end

  def set_donor
    primary_donor_params = params[:primary_donor]

    @campaign.primary_donor = PrimaryDonor.find_or_initialize_by(email: primary_donor_params[:email]) do |new_donor|
      new_donor.name = primary_donor_params[:name]
    end
  end

  def create_campaign_charities
    charity_params = params[:charities]

    @campaign.campaign_charities = charity_params.map do |campaign_charity_param|
      CampaignCharity.new(charity_id: campaign_charity_param[:charity][:id],
                          giving_sg_url: campaign_charity_param[:giving_sg_url])
    end
  end

  def create_or_update_campaign_charities
    charity_params = params[:charities]

    existing_ids = charity_params.pluck(:id).compact
    campaign_charities = CampaignCharity.find(existing_ids)

    campaign_charities_to_add = charity_params.select { |campaign_charity| campaign_charity[:id].nil? }

    campaign_charities_to_add.each do |campaign_charity|
      campaign_charities << CampaignCharity.new(charity_id: campaign_charity[:charity][:id],
                                                giving_sg_url: campaign_charity[:giving_sg_url])
    end

    @campaign.campaign_charities = campaign_charities
  end

  def filter
    scope = Campaign.all

    scope = scope.contains(params[:name]) if params[:name].present?

    starts_before = params[:starts_before]
    starts_after = params[:starts_after]
    ends_before = params[:ends_before]
    ends_after = params[:ends_after]

    scope = scope.starts_before(starts_before).starts_after(starts_after)
                 .ends_before(ends_before).ends_after(ends_after)

    return scope if starts_before.present? || starts_after.present? || ends_before.present? || ends_after.present?

    is_active = params[:is_active]
    is_upcoming = params[:is_upcoming]
    is_completed = params[:is_completed]
    status_scoped = Campaign.active(is_active).or(Campaign.upcoming(is_upcoming)).or(Campaign.completed(is_completed))

    scope.merge(status_scoped)
  end
end
