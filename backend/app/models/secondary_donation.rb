# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :coupon, optional: true
  belongs_to :campaign_charity

  validates :amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :coupon_must_be_for_campaign_charity

  private

  def coupon_must_be_for_campaign_charity
    coupon_campaign = coupon.campaign
    campaign_charity_campaign = campaign_charity.campaign

    return if coupon_campaign == campaign_charity_campaign

    errors.add(:coupon, 'must be for the same campaign as the campaign charity')
  end
end
