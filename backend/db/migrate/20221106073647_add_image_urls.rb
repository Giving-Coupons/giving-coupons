# frozen_string_literal: true

class AddImageUrls < ActiveRecord::Migration[7.0]
  def change
    add_column :campaigns, :image_url, :string

    change_table :charities, bulk: true do |t|
      t.string :logo_url
      t.string :image_url
    end

    change_table :interests, bulk: true do |t|
      t.string :campaign_image_url
      t.string :donor_image_url
    end

    add_column :primary_donors, :image_url, :string
  end
end
