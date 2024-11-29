import api from './api'; // Importando a configuração do axios com token

const API_URL = '/todoitems/'; // URL da API para tarefas (todos)

// Função para obter os itens da lista de tarefas
export const getTodoItems = async () => {
  try {
    const response = await api.get(API_URL); // Usando a configuração com o token
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Função para criar um novo item de tarefa
export const createTodoItem = async (todoItemData) => {
  try {
    const response = await api.post(API_URL, todoItemData); // Usando a configuração com o token
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
