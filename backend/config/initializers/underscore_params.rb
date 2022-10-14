# Enable converting of parameters to snake case.
ActionDispatch::Request.parameter_parsers[:json] = lambda do |raw_post|
  # From action_dispatch/http/parameters.rb.
  data = ActiveSupport::JSON.decode(raw_post)
  data.deep_transform_keys!(&:underscore)
  data.is_a?(Hash) ? data : { _json: data }
end
