class AddCampaignCharityToCoupon < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :coupons, :is_redeemed, :boolean
    add_reference :coupons, :campaign_charity, foreign_key: true

    # Migrate existing data
    execute "UPDATE coupons c SET campaign_charity_id =
(SELECT campaign_charity_id FROM secondary_donations sd WHERE sd.coupon_id = c.id)"

  end

  def self.down
    remove_reference :coupons, :campaign_charity, foreign_key: true
    add_column :coupons, :is_redeemed, :boolean
  end
end
