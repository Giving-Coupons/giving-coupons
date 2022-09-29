class CreatePrimaryDonors < ActiveRecord::Migration[7.0]
  def change
    create_table :primary_donors do |t|
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps
    end
    add_index :primary_donors, :email, unique: true
  end
end
