# frozen_string_literal: true

json.array! @secondary_donations, partial: 'secondary_donations/secondary_donation', as: :secondary_donation
