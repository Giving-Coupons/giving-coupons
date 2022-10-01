# frozen_string_literal: true

module AuthErrorHandler
  def render_error(status, message, _data = nil)
    add_error_message(message)

    render 'layouts/empty', status: status
  end
end
