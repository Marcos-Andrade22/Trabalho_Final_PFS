import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todoitems/'; // Substitua com a URL da sua API

export const getTodoItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTodoItem = async (todoItemData) => {
  try {
    const response = await axios.post(API_URL, todoItemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
