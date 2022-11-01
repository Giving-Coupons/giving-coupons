# frozen_string_literal: true

class Coupon < ApplicationRecord
  NUM_ALPHANUMERIC_CHARS_IN_TOKEN = 6

  belongs_to :campaign
  belongs_to :redemption, optional: true

  delegate :secondary_donation, to: :redemption, allow_nil: true
  delegate :campaign_charity, to: :redemption, allow_nil: true

  validates :expires_at, presence: true
  validates :url_token, presence: true, uniqueness: true
  validates :denomination, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :coupon_expires_before_campaign_ends

  def redeemed?
    redemption_id.present?
  end

  def self.generate_unique_url_token
    token = SecureRandom.alphanumeric(NUM_ALPHANUMERIC_CHARS_IN_TOKEN)
    Coupon.exists?(url_token: token) ? generate_unique_url_token : token
  end

  private

  def coupon_expires_before_campaign_ends
    return if expires_at.nil?
    return if expires_at <= campaign.end

    errors.add :expires_at, 'must not be after campaign ends'
  end
end
