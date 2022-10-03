# frozen_string_literal: true

class DeviseTokenAuthCreateAdmins < ActiveRecord::Migration[7.0]
  def change
    create_table(:admins) do |t|
      ## Required
      t.string :provider, null: false, default: 'username'
      t.string :uid, null: false

      ## Database authenticatable
      t.string :encrypted_password, null: false

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.boolean :allow_password_change, default: false

      ## Rememberable
      t.datetime :remember_created_at

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      ## User Info
      t.string :username, null: false
      t.string :email

      ## Tokens
      t.json :tokens

      t.timestamps
    end

    add_index :admins, :username,             unique: true
    add_index :admins, :email,                unique: true
    add_index :admins, %i[uid provider],      unique: true
    add_index :admins, :reset_password_token, unique: true
    add_index :admins, :confirmation_token,   unique: true
  end
end
