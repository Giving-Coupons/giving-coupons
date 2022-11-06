# frozen_string_literal: true

class Charity < ApplicationRecord
  has_many :campaign_charities, dependent: :destroy
  has_many :campaigns, through: :campaign_charities
  has_many :interest_charities, dependent: :destroy
  has_many :interests, through: :interest_charities

  validates :name, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  validates :website_url, presence: true, allow_blank: false, format: { with: URI::DEFAULT_PARSER.make_regexp }
  # validates :logo, presence: true, allow_blank: false
  # validates :image, presence: true, allow_blank: false
end
