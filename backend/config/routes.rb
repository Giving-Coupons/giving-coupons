# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  scope :api do
    scope :v1 do
      mount_devise_token_auth_for 'Admin', at: 'auth', skip: %i[passwords registrations], controllers: {
        sessions: 'auth/sessions',
        token_validations: 'auth/token_validations'
      }

      resources :campaigns do
        collection do
          get :admin_index
        end

        member do
          get 'admin_show'
          post 'regenerate_expired_coupons'
        end
      end

      resources :charities

      resources :coupons, only: %i[index show] do
        collection do
          get 'campaign/:campaign_id/unredeemed', to: 'coupons#campaign_unredeemed'

          get ':url_token/progress', to: 'coupons#progress'
          put ':url_token/progress', to: 'coupons#update_progress'
        end
      end

      resources :interests do
        member do
          post 'reject'
        end
      end

      resources :primary_donors

      resources :redemptions, only: %i[create]

      resources :secondary_donations, only: %i[index create]
    end
  end
end
