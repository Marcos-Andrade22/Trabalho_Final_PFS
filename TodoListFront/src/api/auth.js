import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // Substitua com a URL da sua API

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
