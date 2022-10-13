# frozen_string_literal: true

class Charity < ApplicationRecord
  has_one_base64_attached :logo
  has_one_base64_attached :image

  has_many :campaign_charities, dependent: :destroy
  has_many :campaigns, through: :campaign_charities
  has_many :interest_charities, dependent: :destroy
  has_many :interests, through: :interest_charities

  validates :name, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  validates :website_url, presence: true, allow_blank: false, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates :logo,
            content_type: { in: ['image/png', 'image/jpg', 'image/jpeg'], message: 'is not a supported file type' },
            size: { less_than: 1.megabytes, message: 'must be less than 1MB' }
  validates :image,
            content_type: { in: ['image/png', 'image/jpg', 'image/jpeg'], message: 'is not a supported file type' },
            size: { less_than: 1.megabytes, message: 'must be less than 1MB' }
end
