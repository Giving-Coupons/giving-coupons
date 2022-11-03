class AddDonatedAtToSecondaryDonations < ActiveRecord::Migration[7.0]
  def up
    add_column :secondary_donations, :donated_at, :datetime

    SecondaryDonation.all.each do |sd|
      sd.donated_at = sd.redemption.present? ? sd.redemption.redeemed_at : sd.created_at
      sd.save!
    end

    change_column_null :secondary_donations, :donated_at, false
  end

  def down
    remove_column :secondary_donations, :donated_at
  end
end
