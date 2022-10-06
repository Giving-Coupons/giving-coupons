# frozen_string_literal: true

class PrimaryDonorsController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_primary_donor, only: %i[show update destroy]

  def index
    @primary_donors = PrimaryDonor.all
  end

  def show; end

  def create
    @primary_donor = PrimaryDonor.create!(primary_donor_params)

    add_success_message "Primay Donor, \"#{@primary_donor.name.capitalize}\", successfully created!"
    render :show, status: :created, location: @primary_donor
  end

  def update
    @primary_donor.update!(primary_donor_params)

    add_success_message "Primay Donor, \"#{@primary_donor.name.capitalize}\", successfully updated!"
    render :show, status: :ok, location: @primary_donor
  end

  def destroy
    @primary_donor.destroy!

    add_success_message "Primay Donor, \"#{@primary_donor.name.capitalize}\", successfully deleted!"
    render :show, status: :ok, location: @primary_donor
  end

  private

  def set_primary_donor
    @primary_donor = PrimaryDonor.find(params[:id])
  end

  def primary_donor_params
    permitted_params = %i[name email]

    params.require(:primary_donor).permit(permitted_params)
  end
end
