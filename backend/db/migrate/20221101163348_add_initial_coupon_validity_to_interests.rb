class AddInitialCouponValidityToInterests < ActiveRecord::Migration[7.0]
  def change
    add_column :interests, :initial_coupon_validity, :integer, null: false, default: 3
  end
end
