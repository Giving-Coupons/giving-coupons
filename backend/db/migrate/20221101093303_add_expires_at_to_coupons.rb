# frozen_string_literal: true

class AddExpiresAtToCoupons < ActiveRecord::Migration[7.0]
  def up
    add_column :coupons, :expires_at, :datetime

    execute 'UPDATE coupons SET expires_at = (SELECT c.end FROM campaigns c WHERE campaign_id = c.id)'

    change_column_null :coupons, :expires_at, false
  end

  def down
    remove_column :coupons, :expires_at
  end
end
