import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5287/api', // Base URL do back-end
});

// Interceptador para adicionar o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log("Token:", token); // Para depuração
      config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
