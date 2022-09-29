# frozen_string_literal: true

class CreateCharities < ActiveRecord::Migration[7.0]
  def change
    create_table :charities, &:timestamps
  end
end
