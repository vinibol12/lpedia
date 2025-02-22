import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
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

  useEffect(() => {
    const loadFurniture = async () => {
      try {
        const data = await getFurniture();
        setFurniture(data);
      } catch (error) {
        console.error('Error loading furniture:', error);
      }
    };
    loadFurniture();
  }, []);

  const handleFurnitureSelect = async (item) => {
    setSelectedFurniture(item);
    try {
      const suggestionsData = await getSuggestions(item.id);
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  const handlePhotoUploaded = (url) => {
    setRoomPhotoUrl(url);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        ARSpaces Furniture Previewer
      </Typography>

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
    </Container>
  );
};

export default Home;
