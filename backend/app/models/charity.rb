# frozen_string_literal: true

class Charity < ApplicationRecord
  has_many :campaign_charities, dependent: :destroy
  has_many :campaigns, through: :campaign_charities
end
