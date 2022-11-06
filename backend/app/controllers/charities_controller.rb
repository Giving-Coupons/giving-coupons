# frozen_string_literal: true

class CharitiesController < ApplicationController
  before_action :authenticate_admin!, only: %i[create update destroy]
  before_action :set_charity, only: %i[show update destroy]

  def index
    @charities = Charity.all
  end

  def show; end

  def create
    @charity = Charity.create!(charity_params)

    add_success_message "Charity, \"#{@charity.name}\", successfully created!"
    render :show, status: :created
  end

  def update
    @charity.assign_attributes(charity_params)

    @charity.save!

    add_success_message "Charity, \"#{@charity.name}\", successfully updated!"
    render :show, status: :ok
  end

  def destroy
    @charity.destroy!

    add_success_message "Charity, \"#{@charity.name}\", successfully deleted!"
    render :show, status: :ok
  end

  private

  def set_charity
    @charity = Charity.find(params[:id])
  end

  def charity_params
    params.require(:charity).permit(:name, :description, :website_url, :logo_url, :image_url)
  end
end
