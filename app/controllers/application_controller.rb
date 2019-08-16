class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_pemitted_parameters, if: :devise_cotroller?

  protected

  def configure_pemitted_parameters
    devise_parameter_sanitizer.permit (:sign_up, keys: [:name])
  end
end
