import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import RoomPhotoUpload from './RoomPhotoUpload';
import { generateFurnitureImage } from '../services/imageGeneration';

const FurniturePreview = ({ furniture }) => {
  const [roomPhoto, setRoomPhoto] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePhotoUploaded = (photoData) => {
    setRoomPhoto(photoData);
    setGeneratedImage(null);
    setError(null);
  };

  const handleAreaSelected = (area) => {
    setSelectedArea(area);
  };

  const handleGeneratePreview = async () => {
    if (!roomPhoto || !selectedArea || !furniture) return;

    try {
      setLoading(true);
      setError(null);

      const imageUrl = await generateFurnitureImage(
        roomPhoto.imageUrl,
        furniture.description,
        selectedArea
      );

      setGeneratedImage(imageUrl);
    } catch (err) {
      setError('Failed to generate preview. Please try again.');
      console.error('Preview generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Preview {furniture?.name} in Your Room
      </Typography>

      <RoomPhotoUpload
        onPhotoUploaded={handlePhotoUploaded}
        onAreaSelected={handleAreaSelected}
      />

      {roomPhoto && selectedArea && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePreview}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Preview'}
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {generatedImage && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Generated Preview
          </Typography>
          <img
            src={generatedImage}
            alt="Generated furniture preview"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FurniturePreview;
