# frozen_string_literal: true

class CampaignCharity < ApplicationRecord
  belongs_to :campaign
  belongs_to :charity
  has_many :redemptions, dependent: :destroy
  has_many :secondary_donations, dependent: :destroy
  has_many :coupons, through: :redemptions

  validates :giving_sg_url, presence: true, allow_blank: false, format: { with: URI::DEFAULT_PARSER.make_regexp }

  def donation_breakdown
    primary_donor_amount = coupons.length * campaign.coupon_denomination
    secondary_donors_amount = secondary_donations.sum(&:amount)
    total_amount = (primary_donor_amount + secondary_donors_amount).to_f
    primary_donor_fraction = primary_donor_amount / total_amount
    secondary_donors_fraction = secondary_donors_amount / total_amount

    { primary_donor_amount: primary_donor_amount,
      primary_donor_fraction: primary_donor_fraction,
      secondary_donors_amount: secondary_donors_amount,
      secondary_donors_fraction: secondary_donors_fraction }
  end
end
