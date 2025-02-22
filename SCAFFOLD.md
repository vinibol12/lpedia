# Project Scaffold: AR Furniture Previewer

## Project Structure Overview
```
lpedia/
├── .github/
│   └── workflows/
│       ├── azure-deploy.yml      # Backend deployment workflow
│       └── frontend-app.yml      # Frontend deployment workflow
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   ├── .env.development        # Dev environment variables
│   ├── .env.production         # Prod environment variables
│   └── staticwebapp.config.json # Azure Static Web Apps config
├── backend/
│   ├── Controllers/            # API endpoints
│   ├── Models/                 # Data models
│   ├── Services/              # Business logic
│   ├── Program.cs             # App configuration
│   ├── appsettings.json       # App settings
│   └── web.config             # IIS configuration
├── REQUIREMENTS.md            # Project requirements
├── RULES.md                  # Development rules
└── SCAFFOLD.md               # This file
```

## Environment Variables

### Frontend (.env.development, .env.production)
```env
REACT_APP_API_URL=http://localhost:8080     # Dev
REACT_APP_API_URL=https://lpediabackend.azurewebsites.net  # Prod
REACT_APP_8THWALL_KEY=your_8thwall_key
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=app.db"
  },
  "AzureStorage": {
    "ConnectionString": "your_storage_connection_string",
    "ContainerName": "room-photos"
  },
  "OpenAI": {
    "ApiKey": "your_openai_key",
    "Model": "gpt-3.5-turbo"
  },
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://salmon-ocean-04da24500.4.azurestaticapps.net"
    ]
  }
}
```

## Azure Resources

### Required Resources
1. Azure Static Web Apps
   - Name: salmon-ocean-04da24500
   - SKU: Free
   - Location: East US 2

2. Azure App Service
   - Name: lpediabackend
   - SKU: F1 (Free)
   - Runtime: .NET 8

3. Azure Blob Storage
   - Account: lpediastorage
   - Container: room-photos
   - Access: Private

## GitHub Secrets Required
```
AZURE_PUBLISHING_PROFILE          # App Service publish profile
AZURE_STATIC_WEB_APPS_API_TOKEN  # Static Web Apps deployment token
```

## API Endpoints

### Backend Controllers
```csharp
// FurnitureController
GET    /api/furniture           // Get all furniture
GET    /api/furniture/{id}      // Get single item
POST   /api/photos             // Upload room photo
GET    /api/suggestions/{id}    // Get AI suggestions
```

## Database Schema

### SQLite Tables
```sql
CREATE TABLE Furniture (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Type TEXT NOT NULL,
    ModelUrl TEXT NOT NULL,
    CreatedAt TEXT NOT NULL
);
```

## Frontend Components

### Core Components
```jsx
// Components/
├── PhotoUploader.jsx    // Dropzone for room photos
├── FurnitureCatalog.jsx // List of furniture items
├── ARViewer.jsx         // 8th Wall AR integration
└── Suggestions.jsx      // AI suggestions display
```

### Pages
```jsx
// Pages/
├── Home.jsx            // Main page with upload
└── Preview.jsx         // AR preview page
```

## External Dependencies

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dropzone": "^11.2.4",
    "@8thwall/web": "^1.0.0",
    "axios": "^1.6.0"
  }
}
```

### Backend (Lpedia.csproj)
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.0" />
  <PackageReference Include="Azure.Storage.Blobs" Version="12.19.0" />
  <PackageReference Include="OpenAI" Version="1.7.2" />
</ItemGroup>
```

## Build and Deploy Instructions

### Local Development
```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
dotnet restore
dotnet run
```

### Production Deployment
1. Push to master branch
2. GitHub Actions will:
   - Build and deploy backend to Azure App Service
   - Build and deploy frontend to Azure Static Web Apps

## Required Configuration Steps
1. Create Azure resources using provided names
2. Set up GitHub secrets for deployments
3. Configure CORS in Azure App Service
4. Set up environment variables in both apps
5. Initialize SQLite database with seed data

## Testing Requirements
1. Frontend unit tests with Jest
2. Backend unit tests with xUnit
3. E2E tests with Cypress
4. API integration tests

This scaffold provides a complete blueprint for rebuilding the application, including all necessary configuration, environment variables, and deployment steps. It can be used as a template for similar prototypes or as a guide for LLMs to reconstruct the entire application.
