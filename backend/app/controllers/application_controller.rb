# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ::ActionView::Layouts
  include StatusMessages

  layout 'application'
  before_action :underscore_params!

  private

  # Convert all JSON keys from camelCase to snake_case
  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end
