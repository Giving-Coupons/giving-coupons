# frozen_string_literal: true

class PrimaryDonor < ApplicationRecord
  has_one_base64_attached :image

  has_many :campaigns, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
