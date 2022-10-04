# frozen_string_literal: true

module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    include AuthErrorHandler

    wrap_parameters format: []

    def create
      if ENV.fetch('MASTER_PASSWORD') != sign_up_params[:master_password]
        add_error_message 'Master password could not be validated.'
        render 'auth/admin', status: :unauthorized
        return
      end

      params.delete :master_password
      super
    end

    private

    def render_create_success
      add_success_message("Admin #{@resource.username} successfully registered!")

      render 'auth/admin', status: :created
    end

    def render_create_error
      if resource_errors[:full_messages].empty?
        add_error_message("Unable to register admin with username #{@resource.username}.")
      else
        first_error_message = resource_errors[:full_messages][0]
        add_error_message("Unable to register admin with username #{@resource.username}. #{first_error_message}.")
      end

      render 'auth/admin', status: :unprocessable_entity
    end
  end
end
