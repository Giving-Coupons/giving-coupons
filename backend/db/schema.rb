# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_02_182251) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "interest_status", ["pending", "approved", "rejected"]

  create_table "admins", force: :cascade do |t|
    t.string "provider", default: "username", null: false
    t.string "uid", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "username", null: false
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_admins_on_uid_and_provider", unique: true
    t.index ["username"], name: "index_admins_on_username", unique: true
  end

  create_table "campaign_charities", force: :cascade do |t|
    t.bigint "campaign_id", null: false
    t.bigint "charity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_campaign_charities_on_campaign_id"
    t.index ["charity_id"], name: "index_campaign_charities_on_charity_id"
  end

  create_table "campaigns", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.integer "promised_amount", null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.bigint "primary_donor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "interest_id"
    t.integer "coupon_denomination", null: false
    t.index ["interest_id"], name: "index_campaigns_on_interest_id"
    t.index ["primary_donor_id"], name: "index_campaigns_on_primary_donor_id"
  end

  create_table "charities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coupons", force: :cascade do |t|
    t.string "url_token", null: false
    t.integer "denomination", null: false
    t.bigint "campaign_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_coupons_on_campaign_id"
    t.index ["url_token"], name: "index_coupons_on_url_token", unique: true
  end

  create_table "interest_charities", force: :cascade do |t|
    t.bigint "interest_id", null: false
    t.bigint "charity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["charity_id"], name: "index_interest_charities_on_charity_id"
    t.index ["interest_id"], name: "index_interest_charities_on_interest_id"
  end

  create_table "interests", force: :cascade do |t|
    t.string "donor_name", null: false
    t.string "donor_email", null: false
    t.string "campaign_name", null: false
    t.text "campaign_description", null: false
    t.integer "promised_amount", null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.enum "status", default: "pending", null: false, enum_type: "interest_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "coupon_denomination", null: false
  end

  create_table "primary_donors", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_primary_donors_on_email", unique: true
  end

  create_table "secondary_donations", force: :cascade do |t|
    t.integer "amount"
    t.bigint "coupon_id"
    t.bigint "campaign_charity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_charity_id"], name: "index_secondary_donations_on_campaign_charity_id"
    t.index ["coupon_id"], name: "index_secondary_donations_on_coupon_id"
  end

  add_foreign_key "campaign_charities", "campaigns"
  add_foreign_key "campaign_charities", "charities"
  add_foreign_key "campaigns", "interests"
  add_foreign_key "campaigns", "primary_donors"
  add_foreign_key "coupons", "campaigns"
  add_foreign_key "interest_charities", "charities"
  add_foreign_key "interest_charities", "interests"
  add_foreign_key "secondary_donations", "campaign_charities"
  add_foreign_key "secondary_donations", "coupons"
end
