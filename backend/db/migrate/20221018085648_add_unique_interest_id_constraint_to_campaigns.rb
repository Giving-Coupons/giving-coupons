# frozen_string_literal: true

class AddUniqueInterestIdConstraintToCampaigns < ActiveRecord::Migration[7.0]
  def change
    remove_index :campaigns, :interest_id
    add_index :campaigns, [:interest_id], unique: true
  end
end
