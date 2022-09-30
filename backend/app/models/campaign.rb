# frozen_string_literal: true

class Campaign < ApplicationRecord
  # Associations
  belongs_to :primary_donor
  has_many :coupons, dependent: :destroy
  has_many :campaign_charities, dependent: :destroy
  has_many :charities, through: :campaign_charities

  # Validations
  validates :name, presence: true
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, presence: true, comparison: { greater_than: :start }
end
