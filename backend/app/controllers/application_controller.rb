# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ::ActionView::Layouts
  include StatusMessages

  # helper to have access to methods in jbuilder templates
  helper Base64Helper

  layout 'application'

  before_action :underscore_params!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :force_request_accept_header_to_json

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

  # Ruby on Rails does not follow the HTTP ACCEPT header spec. As long as '*/*' appears in it, rails will return HTML,
  # even if the client requests 'application/json' as more preferable. As we only support JSON in this server, rails
  # will be unable to create the layout and will return 500: Internal Server Error.
  # To fix this issue, as a workaround we will force rails to treat every request as accepting JSON since that is the
  # only response type we support anyway.
  def force_request_accept_header_to_json
    request.format = :json
  end

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end

  def authenticate_admin!
    return if current_admin

    add_error_message 'This action can only be performed by an authenticated admin!'
    render 'layouts/empty', status: :unauthorized
  end

  rescue_from ActiveRecord::StatementInvalid, ActionController::ParameterMissing do |e|
    add_error_message "Request contains invalid or malformed parameters: #{e}"
    render 'layouts/empty', status: :bad_request
  end

  rescue_from ActiveRecord::RecordInvalid, ArgumentError do |e|
    add_error_message e
    render 'layouts/empty', status: :unprocessable_entity
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    add_error_message "#{e.model} not found!"
    render 'layouts/empty', status: :not_found
  end
end
