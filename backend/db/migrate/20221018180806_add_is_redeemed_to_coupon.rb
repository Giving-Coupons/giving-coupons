# frozen_string_literal: true

class AddIsRedeemedToCoupon < ActiveRecord::Migration[7.0]
  def self.up
    add_column :coupons, :is_redeemed, :boolean

    # Migrate existing data
    execute "UPDATE coupons c SET is_redeemed =
(SELECT COUNT(*) FROM secondary_donations sd WHERE sd.coupon_id = c.id) > 0"

    # Then add not null constraint, with default
    change_column_null :coupons, :is_redeemed, false
    change_column_default :coupons, :is_redeemed, false
  end

  def self.down
    remove_column :coupons, :is_redeemed
  end
end
