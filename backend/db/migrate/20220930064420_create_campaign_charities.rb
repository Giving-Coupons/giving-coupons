# frozen_string_literal: true

class CreateCampaignCharities < ActiveRecord::Migration[7.0]
  def change
    create_table :campaign_charities do |t|
      t.references :campaign, null: false, foreign_key: true
      t.references :charity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
