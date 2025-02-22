import React, { useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';

const ARViewer = ({ modelUrl, roomPhotoUrl }) => {
  useEffect(() => {
    if (!process.env.REACT_APP_8THWALL_KEY) {
      console.warn('8th Wall API key not configured');
      return;
    }

    // Initialize AR viewer here when 8th Wall is properly configured
  }, [modelUrl, roomPhotoUrl]);

  if (!process.env.REACT_APP_8THWALL_KEY) {
    return (
      <Alert severity="info">
        <Typography>
          FurniFit AR preview requires an 8th Wall API key. Please configure REACT_APP_8THWALL_KEY in your .env file.
        </Typography>
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '500px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1">
        Loading FurniFit AR Preview...
      </Typography>
    </Box>
  );
};

export default ARViewer;
