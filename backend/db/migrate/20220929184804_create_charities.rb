class CreateCharities < ActiveRecord::Migration[7.0]
  def change
    create_table :charities do |t|

      t.timestamps
    end
  end
end
