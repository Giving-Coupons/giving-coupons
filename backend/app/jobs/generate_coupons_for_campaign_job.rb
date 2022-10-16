# frozen_string_literal: true

class GenerateCouponsForCampaignJob < ApplicationJob
  queue_as :urgent

  def perform(campaign)
    campaign.generate_coupons
  end
end
