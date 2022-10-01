# frozen_string_literal: true

if @message
  json.call(@message, :type, :message)
else
  json.nil!
end
