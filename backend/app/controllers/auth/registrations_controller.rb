# frozen_string_literal: true

module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def render_create_success
      add_success_message("Admin '#{@resource.username}' successfully registered!")

      render 'auth/admin', status: :created
    end

    def render_create_error
      add_error_message("Unable to register admin with username '#{@resource.username}'.")

      render 'auth/admin', status: :unprocessable_entity
    end

    def render_error(status, message, _data = nil)
      add_error_message(message)

      render 'layouts/empty', status: status
    end
  end
end
