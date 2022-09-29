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

ActiveRecord::Schema[7.0].define(version: 2022_09_29_190002) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaigns", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "promised_amount", null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.bigint "primary_donor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["primary_donor_id"], name: "index_campaigns_on_primary_donor_id"
  end

  create_table "campaigns_charities", id: false, force: :cascade do |t|
    t.bigint "campaign_id", null: false
    t.bigint "charity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_campaigns_charities_on_campaign_id"
    t.index ["charity_id"], name: "index_campaigns_charities_on_charity_id"
  end

  create_table "charities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coupons", force: :cascade do |t|
    t.string "url_token", null: false
    t.integer "denomination", null: false
    t.boolean "is_redeemed", default: false, null: false
    t.bigint "campaign_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_coupons_on_campaign_id"
    t.index ["url_token"], name: "index_coupons_on_url_token", unique: true
  end

  create_table "primary_donors", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_primary_donors_on_email", unique: true
  end

  add_foreign_key "campaigns", "primary_donors"
  add_foreign_key "campaigns_charities", "campaigns"
  add_foreign_key "campaigns_charities", "charities"
  add_foreign_key "coupons", "campaigns"
end
