# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :redemption, optional: true
  belongs_to :campaign_charity
  delegate :coupon, to: :redemption, allow_nil: true

  validates :amount, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 10 }
  validates :redemption, final: true
  validates :redemption_id, allow_nil: true, uniqueness: true
  validates :donated_at, presence: true
  validate :donation_when_campaign_active
  validate :same_time_as_redemption

  def donation_when_campaign_active
    return if campaign_charity.nil? || donated_at.nil?

    campaign = campaign_charity.campaign
    return if campaign.nil?

    return if campaign.start <= donated_at && donated_at <= campaign.end

    errors.add(:donated_at, 'must be between campaign start and end dates')
  end

  def same_time_as_redemption
    return if redemption.nil? || donated_at.nil?
    return if donated_at == redemption.redeemed_at

    errors.add(:donated_at, 'must be the same as redemption time')
  end
end
