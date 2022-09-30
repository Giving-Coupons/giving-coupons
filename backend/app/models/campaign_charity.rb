# frozen_string_literal: true

class CampaignCharity < ApplicationRecord
  belongs_to :campaign
  belongs_to :charity
end
