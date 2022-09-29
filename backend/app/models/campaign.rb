class Campaign < ApplicationRecord
  # Associations
  belongs_to :primary_donor

  # Validations
  validates :name, presence: true
  validates :promised_amount, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :start, presence: true
  validates :end, presence: true, comparison: { greater_than: :start }
end
