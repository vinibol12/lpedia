import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import '@google/model-viewer';

const ARViewer = ({ modelUrl = '/models/couch.glb' }) => {
  return (
    <Box sx={{ width: '100%', height: '600px', position: 'relative' }}>
      <model-viewer
        src={modelUrl}
        ios-src={modelUrl.replace('.glb', '.usdz')} // iOS AR Quick Look
        alt="3D furniture preview"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div slot="poster">
          <CircularProgress />
        </div>
        <div slot="progress-bar">
          <CircularProgress variant="determinate" />
        </div>
        <button slot="ar-button" style={{
          backgroundColor: '#00796b',
          borderRadius: '4px',
          border: 'none',
          color: 'white',
          padding: '8px 16px',
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontFamily: 'Roboto, sans-serif',
        }}>
          👋 View in your space
        </button>
        <div slot="error" style={{
          padding: '16px',
          color: 'red',
          fontFamily: 'Roboto, sans-serif',
        }}>
          <Typography variant="body1">
            Error loading 3D model. Please try again later.
          </Typography>
        </div>
      </model-viewer>
    </Box>
  );
};

export default ARViewer;
