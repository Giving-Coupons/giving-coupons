class Coupon < ApplicationRecord
  # Associations
  belongs_to :campaign

  # Validations
  validates :url_token, presence: true, uniqueness: true
  validates :denomination, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
