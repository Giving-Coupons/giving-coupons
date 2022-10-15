# frozen_string_literal: true

class Campaign < ApplicationRecord
  include PromisedAmountValidator

  has_one_base64_attached :image

  belongs_to :primary_donor
  belongs_to :interest, optional: true
  has_many :coupons, dependent: :destroy
  has_many :campaign_charities, dependent: :destroy
  has_many :charities, through: :campaign_charities
  has_many :secondary_donations, through: :campaign_charities

  after_create :approve_associated_interest
  after_create :generate_coupons

  validates :name, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validates :campaign_charities, length: { minimum: 1, maximum: 5 }
  validates :promised_amount, final: true
  validates :coupon_denomination, final: true
  validates :image,
            content_type: { in: ['image/png', 'image/jpg', 'image/jpeg'],
                            message: 'is mot of a supported file type. Please upload a PNG, JPG or JPEG file.' },
            size: { less_than: 1.megabytes, message: 'must be less than 1MB.' }

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

  def num_redeemed_coupons
    coupons.count(&:redeemed?)
  end

  private

  def approve_associated_interest
    return unless interest

    interest.approve
  end

  def num_coupons
    promised_amount / coupon_denomination
  end

  def generate_coupons
    num_coupons.times do
      coupons.new(denomination: coupon_denomination, url_token: Coupon.generate_unique_url_token)
    end

    save!
  end
end
