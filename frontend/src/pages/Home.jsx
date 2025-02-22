import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Alert } from '@mui/material';
import PhotoUploader from '../components/PhotoUploader';
import FurnitureCatalog from '../components/FurnitureCatalog';
import ARViewer from '../components/ARViewer';
import SuggestionsList from '../components/SuggestionsList';
import { getFurniture, getSuggestions } from '../services/api';

const Home = () => {
  const [furniture, setFurniture] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [roomPhotoUrl, setRoomPhotoUrl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFurniture = async () => {
      try {
        const data = await getFurniture();
        setFurniture(data);
        setError(null);
      } catch (error) {
        console.error('Error loading furniture:', error);
        setError('Unable to connect to the backend server. Make sure it is running and properly configured.');
      }
    };
    loadFurniture();
  }, []);

  const handleFurnitureSelect = async (item) => {
    setSelectedFurniture(item);
    try {
      const suggestionsData = await getSuggestions(item.id);
      setSuggestions(suggestionsData);
      setError(null);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setError('Error loading suggestions. Make sure the OpenAI API key is configured.');
    }
  };

  const handlePhotoUploaded = (url) => {
    setRoomPhotoUrl(url);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        FurniFit Virtual Previewer
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {roomPhotoUrl && selectedFurniture ? (
            <ARViewer
              modelUrl={selectedFurniture.modelUrl}
              roomPhotoUrl={roomPhotoUrl}
            />
          ) : (
            <Box sx={{ mb: 4 }}>
              <PhotoUploader onPhotoUploaded={handlePhotoUploaded} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Select Furniture
          </Typography>
          <FurnitureCatalog
            furniture={furniture}
            onSelect={handleFurnitureSelect}
          />
          {suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}
        </Grid>
      </Grid>

      {!error && furniture.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No furniture items available. Please make sure the database is initialized and seeded with data.
        </Alert>
      )}
    </Container>
  );
};

export default Home;
