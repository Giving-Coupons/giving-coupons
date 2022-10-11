# frozen_string_literal: true

class AddGivingSgUrlToCampaignCharities < ActiveRecord::Migration[7.0]
  def change
    add_column :campaign_charities, :giving_sg_url, :string, null: false, default: ''
  end
end
