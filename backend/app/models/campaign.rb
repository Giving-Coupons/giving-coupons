# frozen_string_literal: true

class Campaign < ApplicationRecord
  include PromisedAmountValidator

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
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }

  def generate_coupons
    num_coupons = promised_amount / COUPON_DENOMINATION
    num_coupons.times do
      coupons.new(denomination: COUPON_DENOMINATION, url_token: Coupon.generate_unique_url_token)
    end
  end
end
