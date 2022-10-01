# frozen_string_literal: true

module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    include AuthErrorHandler

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
  end
end
