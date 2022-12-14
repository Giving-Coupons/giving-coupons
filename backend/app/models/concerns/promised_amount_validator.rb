# frozen_string_literal: true

module PromisedAmountValidator
  extend ActiveSupport::Concern

  included do
    validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :coupon_denomination, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validate :promised_amount_multiple_of_coupon_denomination
  end

  private

  def promised_amount_multiple_of_coupon_denomination
    return if (promised_amount.is_a? Integer) && (coupon_denomination.is_a? Integer) &&
              (promised_amount % coupon_denomination).zero?

    errors.add(:promised_amount, 'must be a multiple of coupon denomination')
  end
end
