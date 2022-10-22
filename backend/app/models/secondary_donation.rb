# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :coupon, optional: true
  belongs_to :campaign_charity

  validates :amount, presence: true, numericality: { only_integer: true }
  validates :coupon, final: true
  validates :coupon_id, allow_nil: true, uniqueness: true
  validate :coupon_from_same_campaign
  validate :coupon_for_same_campaign_charity

  private

  def coupon_from_same_campaign
    return if coupon.nil?

    coupon_campaign = coupon.campaign
    campaign_charity_campaign = campaign_charity.campaign if campaign_charity

    return if coupon_campaign == campaign_charity_campaign

    errors.add(:coupon, 'must be for the same campaign as the campaign charity')
  end

  def coupon_for_same_campaign_charity
    return if coupon.nil?

    coupon_campaign_charity = coupon.campaign_charity
    return if coupon_campaign_charity == campaign_charity

    errors.add(:coupon, 'must be redeemed for the same campaign charity as donation')
  end
end
