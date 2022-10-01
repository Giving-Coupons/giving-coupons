# frozen_string_literal: true

# enum StatusMessageType {
#   ERROR = 'ERROR',
#   SUCCESS = 'SUCCESS',
# }

module StatusMessages
  extend ActiveSupport::Concern

  included do
    prepend_before_action :setup_variable
  end

  def add_error_message(message)
    @message = { type: 'ERROR', message: message }
  end

  def add_success_message(message)
    @message = { type: 'SUCCESS', message: message }
  end

  private

  def setup_variable
    @message = nil
  end
end
