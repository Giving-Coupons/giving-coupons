# frozen_string_literal: true

json.array! @charities, partial: 'charities/charity', as: :charity
