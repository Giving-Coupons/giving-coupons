class CreateSecondaryDonations < ActiveRecord::Migration[7.0]
  def change
    create_table :secondary_donations do |t|
      t.integer :amount, null: false
      t.references :coupon, foreign_key: true
      t.references :campaign_charity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
