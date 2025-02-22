import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './RoomPhotoUpload.css';

const RoomPhotoUpload = ({ onPhotoUploaded }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setLoading(true);

    try {
      const file = acceptedFiles[0];
      if (!file) return;

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Create form data
      const formData = new FormData();
      formData.append('photo', file);

      // Upload to server
      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload photo');

      const data = await response.json();
      onPhotoUploaded(data.imageUrl);
    } catch (err) {
      setError('Failed to upload photo. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  }, [onPhotoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <div className="room-photo-upload">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${preview ? 'has-preview' : ''}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Room preview" className="preview-image" />
            <div className="preview-overlay">
              <p>Drop a new photo to replace this one</p>
            </div>
          </div>
        ) : (
          <div className="upload-prompt">
            <i className="upload-icon">📸</i>
            {isDragActive ? (
              <p>Drop your room photo here</p>
            ) : (
              <>
                <p>Drag & drop your room photo here</p>
                <p className="upload-subtitle">or click to select a file</p>
                <p className="upload-info">Maximum file size: 5MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="upload-status">
          <div className="loader"></div>
          <p>Uploading your photo...</p>
        </div>
      )}

      {error && (
        <div className="upload-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RoomPhotoUpload;
