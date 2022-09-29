class CreateCampaigns < ActiveRecord::Migration[7.0]
  def change
    create_table :campaigns do |t|
      t.string :name, null: false
      t.text :description
      t.integer :promised_amount, null: false
      t.datetime :start, null: false
      t.datetime :end, null: false
      t.references :primary_donor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
