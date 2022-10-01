# frozen_string_literal: true

class Interest < ApplicationRecord
  # Associations
  has_one :campaign, required: false, dependent: nil

  # Validations
  validates :donor_name, presence: true
  validates :donor_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :campaign_name, presence: true
  validates :campaign_description, presence: true, allow_blank: false
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validate :promised_amount_multiple_of_coupon_denomination

  def approve
    primary_donor = PrimaryDonor.find_or_create_by!(email: donor_email) do |new_donor|
      new_donor.name = donor_name
    end

    campaign = Campaign.create!(
      name: campaign_name,
      description: campaign_description,
      promised_amount: promised_amount,
      start: start,
      end: self.end,
      primary_donor: primary_donor,
      interest: self
    )

    campaign.generate_coupons
  end

  private

  def promised_amount_multiple_of_coupon_denomination
    return if (promised_amount % Campaign::COUPON_DENOMINATION).zero?

    errors.add(:promised_amount, 'must be a multiple of coupon denomination')
  end
end
