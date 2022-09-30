# frozen_string_literal: true

class Campaign < ApplicationRecord
  # Associations
  belongs_to :primary_donor
  has_many :coupons, dependent: :destroy
  has_many :campaign_charities, dependent: :destroy
  has_many :charities, through: :campaign_charities

  # Validations
  validates :name, presence: true
  validates :description, presence: true, allow_blank: false
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validate :promised_amount_multiple_of_10

  private

  def promised_amount_multiple_of_10
    return if promised_amount % 10 == 0

    errors.add(:promised_amount, 'must be a multiple of 10')
  end
end
