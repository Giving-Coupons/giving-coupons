# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength
class CampaignsController < ApplicationController
  before_action :authenticate_admin!, except: %i[index show]
  before_action :set_campaign, only: %i[show admin_show update destroy]

  def index
    @campaigns = final_scope
  end

  def admin_index
    @campaigns = Campaign.all
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

    campaign_charities = charity_params.map do |param|
      campaign_charity = CampaignCharity.find_or_initialize_by(id: param[:id])
      campaign_charity.giving_sg_url = param[:giving_sg_url]
      campaign_charity.charity_id = param[:charity][:id]
      campaign_charity
    end

    @campaign.campaign_charities = campaign_charities
  end

  def final_scope
    scope = scoped_with_name

    scope = scope.merge(scoped_with_dates)
    return scope if start_params? || end_params?

    status_params = params[:status]
    return scope if status_params.nil?

    scope.merge(scoped_with_status)
  end

  def scoped_with_name
    params[:name].present? ? Campaign.contains(params[:name]) : Campaign.all
  end

  def start_params?
    start_params = params[:start]
    start_params.present? && (start_params['from'].present? || start_params['to'].present?)
  end

  def end_params?
    end_params = params[:end]
    end_params.present? && (end_params['from'].present? || end_params['to'].present?)
  end

  def scoped_with_dates
    start_params = params[:start]
    starts_before = start_params['to'] if start_params.present?
    starts_after = start_params['from'] if start_params.present?

    end_params = params[:end]
    ends_before = end_params['to'] if end_params.present?
    ends_after = end_params['from'] if end_params.present?

    Campaign.starts_before(starts_before).starts_after(starts_after)
            .ends_before(ends_before).ends_after(ends_after)
  end

  def scoped_with_status
    status_params = params[:status]
    is_active = status_params[:is_active].present? && status_params[:is_active] == 'true'
    is_upcoming = status_params[:is_upcoming].present? && status_params[:is_upcoming] == 'true'
    is_completed = status_params[:is_completed].present? && status_params[:is_completed] == 'true'

    Campaign.active(is_active).or(Campaign.upcoming(is_upcoming)).or(Campaign.completed(is_completed))
  end
end
# rubocop:enable Metrics/ClassLength
