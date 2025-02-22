# requirements.txt
# AR Furniture Previewer Web App Requirements
# Date: February 20, 2025

1. Build a React frontend in frontend/:
   - Use React Dropzone to allow users to upload a room photo (JPEG/PNG, max 5MB) in frontend/src/components/.
   - Fetch and display a furniture catalog from the .NET API as a clickable list in frontend/src/pages/.
   - Integrate 8th Wall WebAR SDK to overlay a selected furniture item's 3D model (.glb) on the uploaded photo.
   - Show AI-generated complementary furniture suggestions below the preview.
   - Add frontend/staticwebapp.config.json to proxy /api/* requests to the .NET API.

2. Build a .NET API backend in backend/:
   - Use .NET 8 with Entity Framework Core and SQLite to store a furniture catalog in backend/Models/.
   - Define a Furniture model with fields: ID (int), Name (string), Type (string), 3DModelUrl (string).
   - Create endpoints in backend/Controllers/:
     - GET /api/furniture: Return the full catalog as JSON.
     - POST /api/photos: Accept a photo file, upload to Azure Blob Storage, return the URL.
     - GET /api/suggestions?itemId={id}: Call OpenAI API and return 3 complementary furniture suggestions.
   - Seed the database with 5 sample furniture items (e.g., sofa, chair) with free .glb model URLs.

3. Integrate external services:
   - Use Azure Blob Storage to store uploaded photos, with a container named "room-photos".
   - Use OpenAI API (model: gpt-3.5-turbo) for suggestions with prompt: "Given a [type], suggest 3 complementary furniture items."
   - Use 8th Wall WebAR SDK (free tier) for AR rendering, loading .glb 3D models.

4. Deployment:
   - Host the React app from frontend/build/ on Azure Static Web Apps.
   - Host the .NET API from backend/ on Azure App Service (SKU: F1 free tier for MVP).
   - Use Azure Resource Group "ar-furniture-rg" to manage both services.

5. Constraints:
   - Keep the MVP simple: static catalog, no user accounts, basic AR functionality.
   - Use Azure free tiers (Static Web Apps, App Service F1) for initial build.