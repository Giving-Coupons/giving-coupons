# frozen_string_literal: true

class CreateInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :interests do |t|
      t.string :donor_name, null: false
      t.string :donor_email, null: false
      t.string :campaign_name, null: false
      t.text :campaign_description, null: false
      t.integer :promised_amount, null: false
      t.datetime :start, null: false
      t.datetime :end, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_reference :campaigns, :interest, foreign_key: true
  end
end
