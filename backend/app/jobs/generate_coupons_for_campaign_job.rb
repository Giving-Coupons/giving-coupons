# frozen_string_literal: true

class GenerateCouponsForCampaignJob < ApplicationJob
  queue_as :urgent

  def perform(campaign, new_expiry_date)
    campaign.generate_coupons(new_expiry_date)
  end
end
