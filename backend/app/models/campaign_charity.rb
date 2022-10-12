# frozen_string_literal: true

class CampaignCharity < ApplicationRecord
  belongs_to :campaign
  belongs_to :charity
  has_many :secondary_donations, dependent: :destroy

  validates :giving_sg_url, presence: true, allow_blank: false, format: { with: URI::DEFAULT_PARSER.make_regexp }
end
