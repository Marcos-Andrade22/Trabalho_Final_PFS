// api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5287/api', // URL base do back-end
});

// Interceptador para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
