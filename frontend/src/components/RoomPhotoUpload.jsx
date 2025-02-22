import React, { useState, useRef } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const RoomPhotoUpload = ({ onPhotoUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Load the image to get dimensions
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Set up canvas with image dimensions
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Store image reference
      imageRef.current = img;

      onPhotoUploaded({
        file,
        imageUrl,
        dimensions: { width: img.width, height: img.height }
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const handleCanvasClick = (event) => {
    if (!imageRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate relative coordinates (0-1)
    const relativeX = x / canvas.width;
    const relativeY = y / canvas.height;
    
    setSelectedArea({ x: relativeX, y: relativeY });
    
    // Draw selection marker
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0);
    
    // Draw selection circle
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          mb: 2
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <CircularProgress />
        ) : (
          <Typography>
            Drag and drop a room photo here, or click to select one
          </Typography>
        )}
      </Box>

      {imageRef.current && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Click where you want to place the furniture
          </Typography>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              width: '100%',
              height: 'auto',
              cursor: 'crosshair'
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RoomPhotoUpload;
