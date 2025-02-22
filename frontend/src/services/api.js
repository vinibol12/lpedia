import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getFurniture = async () => {
  const response = await api.get('/furniture');
  return response.data;
};

export const getFurnitureById = async (id) => {
  const response = await api.get(`/furniture/${id}`);
  return response.data;
};

export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getSuggestions = async (furnitureId) => {
  const response = await api.get(`/suggestions/${furnitureId}`);
  return response.data;
};
