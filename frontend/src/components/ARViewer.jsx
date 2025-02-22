import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const ARViewer = ({ modelUrl, roomPhotoUrl }) => {
  return (
    <Paper
      sx={{
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        p: 3
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          AR Preview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {roomPhotoUrl ? (
            <>
              Room photo uploaded successfully!
              <br />
              <small>AR preview requires 8th Wall API key configuration</small>
            </>
          ) : (
            'Upload a room photo to start the AR preview'
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ARViewer;
