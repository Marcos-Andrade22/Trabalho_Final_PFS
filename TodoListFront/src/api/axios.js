// api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua com o endereço correto do seu back-end
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
