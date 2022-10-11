# frozen_string_literal: true

class AddColumnsToCharities < ActiveRecord::Migration[7.0]
  def change
    # rubocop:disable Rails/BulkChangeTable
    change_table :charities do |t|
      t.string :name, null: false, default: ''
      t.text :description, null: false, default: ''
      t.string :website_url, null: false, default: ''

      t.change_default :name, from: '', to: nil
      t.change_default :description, from: '', to: nil
      t.change_default :website_url, from: '', to: nil
    end
    # rubocop:enable Rails/BulkChangeTable
  end
end
