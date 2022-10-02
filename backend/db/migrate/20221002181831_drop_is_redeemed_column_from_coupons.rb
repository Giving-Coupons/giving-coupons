class DropIsRedeemedColumnFromCoupons < ActiveRecord::Migration[7.0]
  def change
    remove_column :coupons, :is_redeemed
  end
end
