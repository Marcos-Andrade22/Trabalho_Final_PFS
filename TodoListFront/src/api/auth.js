// auth.js

// Função para login
export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5287/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token); // Armazenar token
  } catch (error) {
    console.error("Login failed:", error);
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
