# frozen_string_literal: true

class AddCouponDenominationToCampaign < ActiveRecord::Migration[7.0]
  def change
    # rubocop:disable Rails/BulkChangeTable
    change_table :campaigns do |t|
      t.integer :coupon_denomination, null: false, default: 10
      t.change_default :coupon_denomination, from: 10, to: nil
    end

    change_table :interests do |t|
      t.integer :coupon_denomination, null: false, default: 10
      t.change_default :coupon_denomination, from: 10, to: nil
    end
    # rubocop:enable Rails/BulkChangeTable
  end
end
