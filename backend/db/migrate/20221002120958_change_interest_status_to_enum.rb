class ChangeInterestStatusToEnum < ActiveRecord::Migration[7.0]
  def self.up
    create_enum :interest_status, %i[pending approved rejected]
    change_column_default :interests, :status, nil
    change_column :interests, :status, :interest_status, null: false, default: 'pending',
                                                         using: 'CASE ' \
                                                                "WHEN (status = 0) THEN 'pending'::interest_status " \
                                                                "WHEN (status = 1) THEN 'approved'::interest_status " \
                                                                "WHEN (status = 2) THEN 'rejected'::interest_status " \
                                                                'END'
  end

  def self.down
    change_column_default :interests, :status, nil
    change_column :interests, :status, :integer, null: false, default: 0, using: 'CASE ' \
                                                                                 "WHEN (status = 'pending') THEN 0 " \
                                                                                 "WHEN (status = 'approved') THEN 1 " \
                                                                                 "WHEN (status = 'rejected') THEN 2 " \
                                                                                 'END'
  end
end
