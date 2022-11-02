# frozen_string_literal: true

class CreateRedemptions < ActiveRecord::Migration[7.0]
  def up
    create_table :redemptions do |t|
      t.references :campaign_charity, null: false, foreign_key: true
      t.datetime :redeemed_at, null: false

      t.timestamps
    end

    migration_time = DateTime.current

    add_reference :coupons, :redemption, foreign_key: true, index: { unique: true }
    Coupon.select { |c| c.campaign_charity_id.present? }.each do |c|
      result = execute "INSERT INTO redemptions (campaign_charity_id, redeemed_at, created_at, updated_at)
values (#{c.campaign_charity_id}, '#{migration_time}', '#{migration_time}', '#{migration_time}')
returning id as redemption_id"
      redemption_id = result[0]['redemption_id']
      execute "UPDATE coupons SET redemption_id = #{redemption_id} WHERE id = #{c.id}"
    end
    remove_column :coupons, :campaign_charity_id

    add_reference :secondary_donations, :redemption, foreign_key: true, index: { unique: true }
    execute 'UPDATE secondary_donations SET redemption_id =
(SELECT redemption_id FROM coupons WHERE coupons.id = secondary_donations.coupon_id) WHERE coupon_id IS NOT NULL'
    remove_column :secondary_donations, :coupon_id
  end

  def down
    add_column :secondary_donations, :coupon_id, :bigint
    execute 'UPDATE secondary_donations sd SET coupon_id =
(SELECT id FROM coupons c where c.redemption_id = sd.redemption_id) WHERE sd.redemption_id IS NOT NULL'
    remove_reference :secondary_donations, :redemption, foreign_key: true, index: { unique: true }

    add_column :coupons, :campaign_charity_id, :bigint
    execute 'UPDATE coupons c SET campaign_charity_id =
(SELECT campaign_charity_id FROM redemptions r WHERE r.id = c.redemption_id) WHERE c.redemption_id IS NOT NULL'
    remove_reference :coupons, :redemption, foreign_key: true, index: { unique: true }

    drop_table :redemptions
  end
end
