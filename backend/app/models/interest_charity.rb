# frozen_string_literal: true

class InterestCharity < ApplicationRecord
  belongs_to :interest
  belongs_to :charity
end
