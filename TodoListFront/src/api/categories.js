import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories/'; // Substitua com a URL da sua API

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
