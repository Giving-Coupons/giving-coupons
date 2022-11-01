# frozen_string_literal: true

class Redemption < ApplicationRecord
  belongs_to :campaign_charity
  has_one :coupon, required: true, dependent: :nullify
  has_one :secondary_donation, required: false, dependent: :destroy

  validates :redeemed_at, presence: true
  validate :coupon_from_same_campaign
  validate :donation_for_same_campaign_charity

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
end
