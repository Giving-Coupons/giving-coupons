# frozen_string_literal: true

class Interest < ApplicationRecord
  include PromisedAmountValidator

  enum :status, { pending: 0, approved: 1, rejected: 2 }

  # Associations
  has_one :campaign, required: false, dependent: nil

  # Validations
  validates :donor_name, presence: true
  validates :donor_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :campaign_name, presence: true
  validates :campaign_description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }

  def approve_campaign
    self.status = :approved

    primary_donor = PrimaryDonor.find_or_initialize_by(email: donor_email) do |new_donor|
      new_donor.name = donor_name
    end

    campaign = Campaign.new(
      name: campaign_name,
      description: campaign_description,
      promised_amount: promised_amount,
      start: start,
      end: self.end,
      primary_donor: primary_donor,
      interest: self
    )

    save!
  end
end
