class CreateInterestCharities < ActiveRecord::Migration[7.0]
  def change
    create_table :interest_charities do |t|
      t.references :interest, null: false, foreign_key: true
      t.references :charity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
