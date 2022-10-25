# frozen_string_literal: true

class AddProgressToCoupons < ActiveRecord::Migration[7.0]
  def change
    add_column :coupons, :progress, :string
  end
end
