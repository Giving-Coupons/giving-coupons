# frozen_string_literal: true

class StatsController < ApplicationController
  def index
    redemptions = Redemption.includes(:coupon).all

    contribution_amount_from_primary_donor = redemptions.map { |r| r.coupon.denomination }.sum
    contribution_amount_from_secondary_donors = SecondaryDonation.sum(:amount)
    @total_contribution_amount = contribution_amount_from_primary_donor + contribution_amount_from_secondary_donors

    @total_redemption_count = redemptions.count
    @total_charities_supported = CampaignCharity.distinct.count(:charity_id)
  end

  def steps
    redemptions = Redemption.includes(:coupon).all

    contribution_amount_from_primary_donor = redemptions.map { |r| r.coupon.denomination }.sum
    contribution_amount_from_secondary_donors = SecondaryDonation.sum(:amount)
    @total_contribution_amount = contribution_amount_from_primary_donor + contribution_amount_from_secondary_donors

    @total_redemption_count = redemptions.count
  end
end
