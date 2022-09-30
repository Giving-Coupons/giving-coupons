# frozen_string_literal: true

class AddDescriptionNotNullConstraintToCampaigns < ActiveRecord::Migration[7.0]
  def change
    change_column_null :campaigns, :description, false
  end
end
