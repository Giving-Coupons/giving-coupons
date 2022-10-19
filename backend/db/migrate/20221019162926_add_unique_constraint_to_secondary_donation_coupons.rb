class AddUniqueConstraintToSecondaryDonationCoupons < ActiveRecord::Migration[7.0]
  def change
    remove_index :secondary_donations, :coupon_id
    add_index :secondary_donations, [:coupon_id], unique: true
  end
end
