# frozen_string_literal: true

class InterestsController < ApplicationController
  before_action :set_interest, only: %i[show update destroy]

  # GET /interests
  # GET /interests.json
  def index
    @interests = Interest.all
  end

  # GET /interests/1
  # GET /interests/1.json
  def show; end

  # POST /interests
  # POST /interests.json
  def create
    @interest = Interest.new(interest_params)

    if @interest.save
      render :show, status: :created, location: @interest
    else
      render json: @interest.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /interests/1
  # PATCH/PUT /interests/1.json
  def update
    if @interest.update(interest_params)
      render :show, status: :ok, location: @interest
    else
      render json: @interest.errors, status: :unprocessable_entity
    end
  end

  # DELETE /interests/1
  # DELETE /interests/1.json
  def destroy
    @interest.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_interest
    @interest = Interest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def interest_params
    params.fetch(:interest, {})
  end
end
