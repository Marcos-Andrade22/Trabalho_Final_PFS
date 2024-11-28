// api.js
import axios from 'axios';
import { getToken } from './auth';

// Função para obter as categorias
export const getCategories = async () => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated');

  try {
    const response = await axios.get('http://localhost:5000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Função para criar uma nova categoria
export const createCategory = async (categoryName) => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated');

  try {
    const response = await axios.post(
      'http://localhost:5000/api/categories',
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};
