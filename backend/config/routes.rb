# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  scope :api do
    scope :v1 do
      mount_devise_token_auth_for 'Admin', at: 'auth', controllers: {
        registrations: 'auth/registrations',
        sessions: 'auth/sessions'
      }
    end
  end
end
