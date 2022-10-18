# frozen_string_literal: true

module Auth
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    include AuthErrorHandler

    private

    def render_validate_token_success
      render 'layouts/empty', status: :ok
    end

    def render_validate_token_error
      add_error_message 'Your credentials could not be verified.'

      render 'layouts/empty', status: :unauthorized
    end
  end
end
