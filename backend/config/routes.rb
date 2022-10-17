# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  scope :api do
    scope :v1 do
      mount_devise_token_auth_for 'Admin', at: 'auth', skip: %i[passwords], controllers: {
        registrations: 'auth/registrations',
        sessions: 'auth/sessions',
        token_validations: 'devise_token_auth/token_validations'
      }

      resources :campaigns do
        collection do
          get :admin_index
        end

        member do
          get 'admin_show'
        end
      end

      resources :charities

      resources :coupons, only: %i[index show] do
        collection do
          get 'campaign/:campaign_id/unredeemed', to: 'coupons#campaign_unredeemed'
        end
      end

      resources :interests do
        member do
          post 'reject'
        end
      end

      resources :primary_donors

      resources :secondary_donations, only: %i[index create]
    end
  end
end
