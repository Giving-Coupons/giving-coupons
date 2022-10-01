# frozen_string_literal: true

class Campaign < ApplicationRecord
  COUPON_DENOMINATION = 10

  # Associations
  belongs_to :primary_donor
  belongs_to :interest, optional: true
  has_many :coupons, dependent: :destroy
  has_many :campaign_charities, dependent: :destroy
  has_many :charities, through: :campaign_charities

  # Validations
  validates :name, presence: true
  validates :description, presence: true, allow_blank: false
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validate :promised_amount_multiple_of_coupon_denomination

  def generate_coupons
    num_coupons = promised_amount / COUPON_DENOMINATION
    num_coupons.times do
      coupons.new(denomination: COUPON_DENOMINATION, url_token: SecureRandom.alphanumeric(6))
    end
  end

  private

  def promised_amount_multiple_of_coupon_denomination
    return if (promised_amount % COUPON_DENOMINATION).zero?

    errors.add(:promised_amount, 'must be a multiple of coupon denomination')
  end
end
