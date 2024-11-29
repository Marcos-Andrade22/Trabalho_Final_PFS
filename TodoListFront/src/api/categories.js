import api from './api'; // Importando a configuração do axios com token

const API_URL = '/categories/'; // URL da API para categorias

// Função para obter as categorias
export const getCategories = async () => {
  try {
    const response = await api.get(API_URL); // Usando a configuração com o token
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Função para criar uma nova categoria
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post(API_URL, categoryData); // Usando a configuração com o token
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
