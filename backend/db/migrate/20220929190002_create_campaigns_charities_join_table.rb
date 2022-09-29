class CreateCampaignsCharitiesJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :campaigns_charities, id: false do |t|
      t.belongs_to :campaign, null: false, foreign_key: true
      t.belongs_to :charity, null: false, foreign_key: true
    end
  end
end
