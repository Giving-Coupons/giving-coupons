# frozen_string_literal: true

class AddColumnsToCharities < ActiveRecord::Migration[7.0]
  def change
    change_table :charities, bulk: true do |t|
      t.string :name, null: false, default: ''
      t.text :description, null: false, default: ''
      t.string :website_url, null: false, default: ''
    end
  end
end
