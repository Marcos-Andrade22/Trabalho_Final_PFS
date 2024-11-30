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

export const updateTodoItem = async (itemId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:5287/api/todoItems/${itemId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    throw new Error('Erro ao atualizar item');
  }
};

export const deleteTodoItem = async (itemId) => {
  try {
    await axios.delete(`http://localhost:5287/api/todoItems/${itemId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    throw new Error('Erro ao excluir item');
  }
};
