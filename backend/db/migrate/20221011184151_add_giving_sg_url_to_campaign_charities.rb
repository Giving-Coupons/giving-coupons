# frozen_string_literal: true

class AddGivingSgUrlToCampaignCharities < ActiveRecord::Migration[7.0]
  def change
    # rubocop:disable Rails/BulkChangeTable
    change_table :campaign_charities do |t|
      t.string :giving_sg_url, null: false, default: ''
      t.change_default :giving_sg_url, from: '', to: nil
    end
    # rubocop:enable Rails/BulkChangeTable
  end
end
