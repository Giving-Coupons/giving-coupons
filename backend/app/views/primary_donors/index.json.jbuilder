# frozen_string_literal: true

json.array! @primary_donors, partial: 'primary_donors/primary_donor', as: :primary_donor
