# frozen_string_literal: true

json.array! @interests, partial: 'interests/interest', as: :interest
