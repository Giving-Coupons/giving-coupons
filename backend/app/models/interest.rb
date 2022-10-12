# frozen_string_literal: true

class Interest < ApplicationRecord
  include PromisedAmountValidator

  enum :status, { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  has_one :campaign, required: false, dependent: nil
  has_many :interest_charities, dependent: :destroy
  has_many :charities, through: :interest_charities

  validates :donor_name, presence: true
  validates :donor_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :campaign_name, presence: true
  validates :campaign_description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validates :interest_charities, presence: true
  validate :must_be_pending, on: :create

  def approve
    return unless pending?

    self.status = :approved

    primary_donor = PrimaryDonor.find_or_initialize_by(email: donor_email) do |new_donor|
      new_donor.name = donor_name
    end

    self.campaign = Campaign.new(
      name: campaign_name,
      description: campaign_description,
      promised_amount: promised_amount,
      coupon_denomination: coupon_denomination,
      start: start,
      end: self.end,
      primary_donor: primary_donor,
      charities: charities
    )

    save!
  end

  def reject
    return unless pending?

    self.status = :rejected
    save!
  end

  private

  def must_be_pending
    return if pending?
    return if status.blank?

    errors.add :status, "New interest must have empty or 'pending' status."
  end
end
