# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength
class CampaignsController < ApplicationController
  before_action :authenticate_admin!, except: %i[index show]
  before_action :set_campaign, only: %i[show update destroy regenerate_expired_coupons]

  def index
    scope = Campaign.includes(:primary_donor, :coupons, :secondary_donations, image_attachment: :blob,
                                                                              charities: [logo_attachment: :blob]).all
    @campaigns = filtered(scope)
  end

  def admin_index
    @campaigns = Campaign.includes(:primary_donor).all
  end

  def show; end

  def admin_show
    @campaign = Campaign.includes(
      :secondary_donations,
      image_attachment: :blob,
      primary_donor: { image_attachment: :blob },
      coupons: { redemption: [secondary_donation: { campaign_charity: :charity }] },
      campaign_charities: [:secondary_donations,
                           :coupons,
                           { charity: [logo_attachment: :blob, image_attachment: :blob] }]
    )
                        .find(params[:id])
  end

  def create
    @campaign = Campaign.new(campaign_params)

    set_donor
    set_interest
    create_campaign_charities

    @campaign.image.attach(data: params[:image_base64]) if params[:image_base64].present?

    @campaign.save!

    initial_coupon_expiry = [@campaign.start, Date.current].max + params[:initial_coupon_validity].days
    initial_coupon_expiry = [initial_coupon_expiry, @campaign.end].min
    @campaign.queue_generate_coupons_job(initial_coupon_expiry)

    add_success_message "Campaign \"#{@campaign.name}\" successfully created!"
    render :response, status: :created, location: @campaign
  end

  def update
    @campaign.assign_attributes(campaign_params)

    set_donor
    set_interest
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

  def regenerate_expired_coupons
    if @campaign.num_coupons_to_generate == 0
      add_error_message 'There are no coupons to regenerate!'
      render 'layouts/empty', status: :unprocessable_entity
      return
    end

    @campaign.queue_generate_coupons_job(params[:expiry_date])

    add_success_message "The coupons are being regenerated. This may take a while."
    render 'layouts/empty', status: :ok
  end

  private

  def set_campaign
    @campaign = Campaign.includes(:coupons, :secondary_donations,
                                  image_attachment: :blob,
                                  primary_donor: [image_attachment: :blob],
                                  campaign_charities: [:coupons, :secondary_donations,
                                                       { charity: [logo_attachment: :blob,
                                                                   image_attachment: :blob] }]).find(params[:id])
  end

  def campaign_params
    top_level_params = %i[charities primary_donor]
    params.require(top_level_params)
    params.permit(:interest_id)

    campaign_params = %i[name description promised_amount start end coupon_denomination]
    params.require(:campaign).permit(campaign_params)
  end

  def set_donor
    primary_donor_params = params[:primary_donor]

    primary_donor = PrimaryDonor.find_or_initialize_by(email: primary_donor_params[:email])
    primary_donor.name = primary_donor_params[:name]
    if primary_donor_params[:image_base64].present?
      primary_donor.image.attach(data: primary_donor_params[:image_base64])
    end

    @campaign.primary_donor = primary_donor
  end

  def set_interest
    return if params[:interest_id].nil?

    @campaign.interest = Interest.find(params[:interest_id])
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

  def filtered(scope)
    scope = scope.merge(scoped_with_name)

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
