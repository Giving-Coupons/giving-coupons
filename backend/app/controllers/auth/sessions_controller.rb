# frozen_string_literal: true

module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    wrap_parameters format: []

    private

    def render_create_success
      add_success_message("Welcome, #{@resource.username}!")

      render 'auth/admin', status: :created
    end

    def render_destroy_success
      add_success_message('Successfully logged out!')

      render 'layouts/empty', status: :ok
    end

    def render_error(status, message, _data = nil)
      add_error_message(message)

      render 'layouts/empty', status: status
    end
  end
end
