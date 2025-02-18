provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "lpedia" {
  name     = "LpediaResourceGroup"
  location = "<your-location>"
}

resource "azurerm_app_service_plan" "lpedia" {
  name                = "LpediaAppServicePlan"
  location            = azurerm_resource_group.lpedia.location
  resource_group_name = azurerm_resource_group.lpedia.name
  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "lpedia_backend" {
  name                = "LpediaBackend"
  location            = azurerm_resource_group.lpedia.location
  resource_group_name = azurerm_resource_group.lpedia.name
  app_service_plan_id = azurerm_app_service_plan.lpedia.id

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = "Production"
  }
}

resource "azurerm_static_site" "lpedia_frontend" {
  name                = "LpediaFrontend"
  location            = azurerm_resource_group.lpedia.location
  resource_group_name = azurerm_resource_group.lpedia.name

  repository_url = "https://github.com/your-repo/Lpedia"
  branch         = "main"
  app_location   = "frontend"
  output_location = "build"

  app_settings = {
    "REACT_APP_API_URL_PROD" = "https://your-backend-url.azurewebsites.net"
  }
}
