class Charity < ApplicationRecord
    # Associations
    has_and_belongs_to_many :campaigns
end
