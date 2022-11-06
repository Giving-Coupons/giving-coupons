# frozen_string_literal: true

class Campaign < ApplicationRecord
  include PromisedAmountValidator

  belongs_to :primary_donor, autosave: true
  belongs_to :interest, optional: true
  has_many :coupons, dependent: :destroy, autosave: true
  has_many :campaign_charities, dependent: :destroy, autosave: true
  has_many :charities, through: :campaign_charities
  has_many :secondary_donations, through: :campaign_charities

  before_validation :update_coupons_expiry_if_needed
  after_create :approve_associated_interest

  validates :name, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validates :campaign_charities, length: { minimum: 1, maximum: 5 }
  validates :promised_amount, final: true
  validates :coupon_denomination, final: true
  validates :interest_id, allow_nil: true, uniqueness: true
  # validates :image_url, presence: true, allow_blank: false

  scope :contains, ->(name) { where('name ILIKE ?', "%#{Campaign.sanitize_sql_like(name)}%") }

  scope :starts_after, ->(datetime) { where('start >= ?', datetime) if datetime.present? }

  scope :starts_before, ->(datetime) { where('start <= ?', datetime) if datetime.present? }

  scope :ends_after, ->(datetime) { where('campaigns.end >= ?', datetime) if datetime.present? }

  scope :ends_before, ->(datetime) { where('campaigns.end <= ?', datetime) if datetime.present? }

  scope :active, lambda { |is_scope_active = true|
    return none unless is_scope_active

    now = DateTime.now
    starts_before(now).ends_after(now)
  }

  scope :upcoming, ->(is_scope_active = true) { is_scope_active ? starts_after(DateTime.now) : none }

  scope :completed, ->(is_scope_active = true) { is_scope_active ? ends_before(DateTime.now) : none }

  def donation_breakdown
    primary_donor_amount = num_redeemed_coupons * coupon_denomination
    secondary_donors_amount = secondary_donations.sum(&:amount)
    total_amount = (primary_donor_amount + secondary_donors_amount).to_f
    primary_donor_fraction = primary_donor_amount / total_amount
    secondary_donors_fraction = secondary_donors_amount / total_amount

    { primary_donor_amount: primary_donor_amount,
      primary_donor_fraction: primary_donor_fraction,
      secondary_donors_amount: secondary_donors_amount,
      secondary_donors_fraction: secondary_donors_fraction }
  end

  def generate_coupons(new_expiry_date)
    num_coupons_to_generate.times do
      coupons.new(denomination: coupon_denomination, url_token: Coupon.generate_unique_url_token,
                  expires_at: new_expiry_date)
    end

    save!
  end

  def num_coupons_allowed
    promised_amount / coupon_denomination
  end

  def num_redeemed_coupons
    coupons.count(&:redeemed?)
  end

  def num_unredeemed_and_unexpired_coupons
    coupons.count { |c| !c.redeemed? && !c.expired? }
  end

  def num_coupons_to_generate
    num_coupons_allowed - num_redeemed_coupons - num_unredeemed_and_unexpired_coupons
  end

  def queue_generate_coupons_job(new_expiry_date)
    GenerateCouponsForCampaignJob.perform_later(self, new_expiry_date)
  end

  private

  def approve_associated_interest
    return unless interest

    interest.approve
  end

  def update_coupons_expiry_if_needed
    coupons.each do |coupon|
      coupon.expires_at = [coupon.expires_at, self.end].min
    end
  end
end
