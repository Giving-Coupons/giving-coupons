class AddCouponDenominationToCampaign < ActiveRecord::Migration[7.0]
  def change
    add_column :campaigns, :coupon_denomination, :integer, null: false, default: 10
    change_column_default :campaigns, :coupon_denomination, from: 10, to: nil

    add_column :interests, :coupon_denomination, :integer, null: false, default: 10
    change_column_default :interests, :coupon_denomination, from: 10, to: nil
  end
end
