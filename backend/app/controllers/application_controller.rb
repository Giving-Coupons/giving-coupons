# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ::ActionView::Layouts
  include StatusMessages

  layout 'application'

  before_action :underscore_params!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # Authentication
  def configure_permitted_parameters
    sign_up_params = %i[username password password_confirmation master_password]
    sign_in_params = %i[username password]

    devise_parameter_sanitizer.permit :sign_up, keys: sign_up_params
    devise_parameter_sanitizer.permit :sign_in, keys: sign_in_params
  end

  def provider
    'username'
  end

  private

  # Convert all JSON keys from camelCase to snake_case
  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end
