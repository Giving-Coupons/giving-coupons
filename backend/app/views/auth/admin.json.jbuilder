# frozen_string_literal: true

if @resource
  json.id @resource.id
  json.username @resource.username
else
  json.nil!
end
