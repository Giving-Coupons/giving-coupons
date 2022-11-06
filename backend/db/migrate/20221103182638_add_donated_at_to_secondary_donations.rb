# frozen_string_literal: true

class AddDonatedAtToSecondaryDonations < ActiveRecord::Migration[7.0]
  def up
    add_column :secondary_donations, :donated_at, :datetime

    # Fixes the errors in the migration 20221101063209_create_redemptions.rb,
    # where redeemed_at could be after campaign ends
    Redemption.includes(coupon: :campaign).all.each do |r|
      r.redeemed_at = [r.redeemed_at, r.coupon.campaign.end].min
      r.save!
    end

    SecondaryDonation.all.each do |sd|
      sd.donated_at = sd.redemption.present? ? sd.redemption.redeemed_at : sd.created_at
      sd.save!
    end

    change_column_null :secondary_donations, :donated_at, false
  end

  def down
    remove_column :secondary_donations, :donated_at
  end
end
