# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  include ActiveStorageSupport::SupportForBase64
end
