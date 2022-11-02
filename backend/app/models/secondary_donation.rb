# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :redemption, optional: true
  belongs_to :campaign_charity
  delegate :coupon, to: :redemption, allow_nil: true

  validates :amount, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 10 }
  validates :redemption, final: true
  validates :redemption_id, allow_nil: true, uniqueness: true
end
