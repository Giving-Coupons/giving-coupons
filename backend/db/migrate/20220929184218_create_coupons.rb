# frozen_string_literal: true

class CreateCoupons < ActiveRecord::Migration[7.0]
  def change
    create_table :coupons do |t|
      t.string :url_token, null: false
      t.integer :denomination, null: false
      t.boolean :is_redeemed, null: false, default: false
      t.references :campaign, null: false, foreign_key: true

      t.timestamps
    end
    add_index :coupons, :url_token, unique: true
  end
end
