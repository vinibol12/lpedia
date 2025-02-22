import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import { uploadPhoto } from '../services/api';

const PhotoUploader = ({ onPhotoUploaded }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const response = await uploadPhoto(file);
      onPhotoUploaded(response.url);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
    }
  }, [onPhotoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f9ff' : '#fff',
        border: '2px dashed #90caf9',
        '&:hover': {
          backgroundColor: '#f0f9ff'
        }
      }}
    >
      <input {...getInputProps()} />
      <Box>
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop your room photo here' : 'Upload Room Photo'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Drag and drop a photo here, or click to select one
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block">
          Supported formats: JPEG, PNG (max 5MB)
        </Typography>
      </Box>
    </Paper>
  );
};

export default PhotoUploader;
