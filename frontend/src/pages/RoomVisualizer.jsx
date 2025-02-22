import React, { useState } from 'react';
import RoomPhotoUpload from '../components/RoomPhotoUpload';
import FurnitureCatalog from '../components/FurnitureCatalog';
import './RoomVisualizer.css';

const RoomVisualizer = () => {
  const [roomPhoto, setRoomPhoto] = useState(null);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [placementPoint, setPlacementPoint] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handlePhotoUploaded = (photoUrl) => {
    setRoomPhoto(photoUrl);
    setGeneratedImage(null);
    setPlacementPoint(null);
  };

  const handleFurnitureSelect = (furniture) => {
    setSelectedFurniture(furniture);
    setGeneratedImage(null);
  };

  const handleImageClick = (event) => {
    if (!roomPhoto || !selectedFurniture) return;

    const img = event.target;
    const rect = img.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setPlacementPoint({ x, y });
  };

  const handleGenerateImage = async () => {
    if (!roomPhoto || !selectedFurniture || !placementPoint) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomImageUrl: roomPhoto,
          furnitureDescription: selectedFurniture.description,
          selectionArea: placementPoint,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate image');

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="room-visualizer">
      <div className="visualizer-content">
        <div className="left-panel">
          <h2>Upload Your Room</h2>
          <RoomPhotoUpload onPhotoUploaded={handlePhotoUploaded} />
          
          {roomPhoto && (
            <div className="preview-section">
              <h3>Place Your Furniture</h3>
              <p className="instruction">
                {selectedFurniture 
                  ? 'Click on the image where you want to place the furniture'
                  : 'Select a furniture piece from the catalog first'}
              </p>
              <div className="image-container" onClick={handleImageClick}>
                <img 
                  src={generatedImage || roomPhoto} 
                  alt="Room preview" 
                  className="room-image"
                />
                {placementPoint && !generatedImage && (
                  <div 
                    className="placement-marker"
                    style={{
                      left: `${placementPoint.x * 100}%`,
                      top: `${placementPoint.y * 100}%`
                    }}
                  />
                )}
              </div>
              {placementPoint && !generatedImage && (
                <button 
                  className="button generate-button"
                  onClick={handleGenerateImage}
                >
                  Generate Preview
                </button>
              )}
            </div>
          )}
        </div>

        <div className="right-panel">
          <h2>Select Furniture</h2>
          <FurnitureCatalog 
            onSelect={handleFurnitureSelect}
            selectedFurniture={selectedFurniture}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer;
