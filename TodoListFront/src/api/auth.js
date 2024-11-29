import axios from 'axios';

// Função para login
export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5287/api/auth/login', {
      username, // Alterado para 'username'
      password,
    });
    console.log("Token recebido:", response.data.token); // Para depuração
    localStorage.setItem('token', response.data.token); // Armazenar token
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

// Função para obter o token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem('token');
};
