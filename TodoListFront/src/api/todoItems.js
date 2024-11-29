// src/api/todoItems.js
import axios from 'axios';
import { getToken } from './auth'; // Função para obter o token JWT

export const getTodoItems = async () => {
  const response = await axios.get('http://localhost:5287/api/todoItems', {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Passando o token JWT
    },
  });
  return response.data; // Supondo que a API retorne todos os itens
};

export const createTodoItem = async (categoryId, todoData) => {
  try {
    const response = await axios.post(
      'http://localhost:5287/api/todoItems',
      {
        title: todoData.title,
        categoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Passando o token JWT
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw new Error('Erro ao criar item');
  }
};
