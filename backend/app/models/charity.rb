# frozen_string_literal: true

class Charity < ApplicationRecord
  has_many :campaign_charities, dependent: :destroy
  has_many :campaigns, through: :campaign_charities
  has_many :interest_charities, dependent: :destroy
  has_many :interests, through: :interest_charities
end
