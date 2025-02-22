import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const generateFurnitureImage = async (roomImageUrl, furnitureDescription, selectionArea) => {
  try {
    const response = await axios.post(`${API_URL}/imagegeneration/generate`, {
      roomImageUrl,
      furnitureDescription,
      selectionArea: JSON.stringify(selectionArea)
    });

    return response.data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
