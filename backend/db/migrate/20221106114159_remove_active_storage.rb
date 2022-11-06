# frozen_string_literal: true

require_relative '20221011033227_create_active_storage_tables.active_storage'

class RemoveActiveStorage < ActiveRecord::Migration[7.0]
  def change
    revert CreateActiveStorageTables
  end
end
