# frozen_string_literal: true

module StatusMessages
  extend ActiveSupport::Concern

  # StatusMessageType
  #   Error: 0,
  #   Success: 1

  included do
    prepend_before_action :setup_variable
  end

  def add_error_message(message)
    @message = { type: 0, message: message }
  end

  def add_success_message(message)
    @message = { type: 1, message: message }
  end

  private

  def setup_variable
    @message = nil
  end
end
