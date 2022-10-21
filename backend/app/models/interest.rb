# frozen_string_literal: true

class Interest < ApplicationRecord
  include PromisedAmountValidator

  enum :status, { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  has_one_base64_attached :campaign_image
  has_one_base64_attached :donor_image

  has_one :campaign, required: false, dependent: nil
  has_many :interest_charities, dependent: :destroy
  has_many :charities, through: :interest_charities

  validates :donor_name, presence: true
  validates :donor_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :campaign_name, presence: true
  validates :campaign_description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validates :interest_charities, length: { minimum: 1, maximum: 5 }
  validate :must_be_pending, on: :create

  def approve
    return unless pending?

    self.status = :approved
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
