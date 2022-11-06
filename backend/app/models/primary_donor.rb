# frozen_string_literal: true

class PrimaryDonor < ApplicationRecord
  has_many :campaigns, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # validates :image_url, presence: true, allow_blank: false
end
