# frozen_string_literal: true

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
# A Base64 string will be in the form of data:[<mediatype>][;base64],<data>

module Base64Helper
  def encoded_file_data_url(image)
    attachment = image.attachment

    return nil if attachment.nil?

    mime_type = attachment.content_type
    "data:#{mime_type};base64,#{Base64.strict_encode64(attachment.download)}"
  end
end
