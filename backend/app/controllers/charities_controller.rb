# frozen_string_literal: true

class CharitiesController < ApplicationController
  before_action :authenticate_admin!, only: %i[create update destroy]
  before_action :set_charity, only: %i[show update destroy]

  wrap_parameters format: :json, include: %w[name description websiteUrl logoBase64 imageBase64]

  def index
    @charities = Charity.all
  end

  def show; end

  def create
    @charity = Charity.new(charity_params.except(:logo_base64, :image_base64))
    @charity.logo.attach(data: charity_params[:logo_base64]) unless charity_params[:logo_base64].nil?
    @charity.image.attach(data: charity_params[:image_base64]) unless charity_params[:image_base64].nil?
    @charity.save!

    add_success_message "Charity, \"#{@charity.name}\", successfully created!"
    render :show, status: :created
  end

  def update
    @charity.update(charity_params.except(:logo_base64, :image_base64))

    if charity_params[:logo_base64].nil?
      @charity.logo.purge
    else
      @charity.logo.attach(data: charity_params[:logo_base64])
    end

    if charity_params[:image_base64].nil?
      @charity.image.purge
    else
      @charity.image.attach(data: charity_params[:image_base64])
    end

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
    params.require(:charity).permit(:name, :description, :website_url, :logo_base64, :image_base64)
  end
end
