# frozen_string_literal: true

class Campaign < ApplicationRecord
  include PromisedAmountValidator

  has_one_attached :image

  belongs_to :primary_donor
  belongs_to :interest, optional: true
  has_many :coupons, dependent: :destroy
  has_many :campaign_charities, dependent: :destroy
  has_many :charities, through: :campaign_charities
  has_many :secondary_donations, through: :campaign_charities

  after_create :generate_coupons

  validates :name, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  validates :start, presence: true
  validates :end, comparison: { greater_than: :start }
  validates :campaign_charities, presence: true
  validates :promised_amount, final: true
  validates :coupon_denomination, final: true

  private

  def num_coupons
    promised_amount / coupon_denomination
  end

  def generate_coupons
    num_coupons.times do
      coupons.new(denomination: coupon_denomination, url_token: Coupon.generate_unique_url_token)
    end

    save!
  end
end
