# frozen_string_literal: true

class Redemption < ApplicationRecord
  belongs_to :campaign_charity
  has_one :coupon, required: true, dependent: :nullify
  has_one :secondary_donation, required: false, dependent: :destroy

  validates :redeemed_at, presence: true
  validate :coupon_from_same_campaign
  validate :donation_for_same_campaign_charity
  validate :coupon_not_expired
  validate :redemption_when_campaign_active

  private

  def coupon_from_same_campaign
    return if coupon.nil?

    coupon_campaign = coupon.campaign
    campaign_charity_campaign = campaign_charity.campaign if campaign_charity

    return if coupon_campaign == campaign_charity_campaign

    errors.add(:coupon, 'must be for the same campaign as the campaign charity')
  end

  def donation_for_same_campaign_charity
    return if secondary_donation.nil?

    donation_campaign_charity = secondary_donation.campaign_charity
    return if donation_campaign_charity == campaign_charity

    errors.add(:coupon, 'must be redeemed for the same campaign charity as donation')
  end

  def coupon_not_expired
    return if coupon.nil? || redeemed_at.nil?

    return if redeemed_at <= coupon.expires_at

    errors.add(:coupon, 'has already expired')
  end

  def redemption_when_campaign_active
    return if campaign_charity.nil? || redeemed_at.nil?

    campaign = campaign_charity.campaign
    return if campaign.nil?

    return if campaign.start <= redeemed_at && redeemed_at <= campaign.end

    errors.add(:redeemed_at, 'must be between campaign start and end dates')
  end

  def same_time_as_donation
    return if secondary_donation.nil? || redeemed_at.nil?
    return if redeemed_at == secondary_donation.donated_at

    errors.add(:redeemed_at, 'must be the same as donation time')
  end
end
