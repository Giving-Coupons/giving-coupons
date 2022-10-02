# frozen_string_literal: true

class SecondaryDonation < ApplicationRecord
  belongs_to :coupon, optional: true
  belongs_to :campaign_charity

  validates :amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
