# frozen_string_literal: true

class Interest < ApplicationRecord
  # Validations
  validates :donor_name, presence: true
  validates :donor_email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :campaign_name, presence: true
  validates :campaign_description, presence: true, allow_blank: false
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validate :promised_amount_multiple_of_ten

  private

  def promised_amount_multiple_of_ten
    return if (promised_amount % 10).zero?

    errors.add(:promised_amount, 'must be a multiple of 10')
  end
end
