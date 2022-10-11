# frozen_string_literal: true

class FinalValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, _value)
    is_value_changed = record.send("#{attribute}_changed?")
    is_record_persisted = record.persisted?

    return unless is_value_changed && is_record_persisted

    record.errors.add(attribute, 'is meant to be final and cannot be changed')
  end
end
