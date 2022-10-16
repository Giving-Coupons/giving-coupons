# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :coupon, optional: true
  belongs_to :campaign_charity

  validates :amount, presence: true, numericality: { only_integer: true }
  validates :coupon, final: true
  validate :coupon_must_be_for_campaign_charity
  validate :coupon_unredeemed, on: :create

  private

  def coupon_must_be_for_campaign_charity
    return if coupon.nil?

    coupon_campaign = coupon.campaign
    campaign_charity_campaign = campaign_charity.campaign if campaign_charity

    return if coupon_campaign == campaign_charity_campaign

    errors.add(:coupon, 'must be for the same campaign as the campaign charity')
  end

  def coupon_unredeemed
    return unless coupon.present? && coupon.redeemed?

    errors.add(:coupon, 'has already been redeemed')
  end
end
