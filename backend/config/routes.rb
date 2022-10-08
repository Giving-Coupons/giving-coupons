# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  scope :api do
    scope :v1 do
      mount_devise_token_auth_for 'Admin', at: 'auth', skip: %i[passwords token_validations], controllers: {
        registrations: 'auth/registrations',
        sessions: 'auth/sessions'
      }

      resources :interests do
        member do
          post 'approve'
          post 'reject'
        end
      end
      resources :primary_donors
    end
  end
end
