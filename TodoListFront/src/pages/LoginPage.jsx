// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios'; // Importando o axios configurado
import SnackbarNotification from '../components/SnackbarNotification';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4e1c1;
`;

const Form = styled.form`
  background-color: #d1b18d;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  font-family: 'Georgia', serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #4b3f2f;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Georgia', serif;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4b3f2f;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    try {
      const { data } = await api.post('/auth/login', loginData); // Requisição para login
      localStorage.setItem('token', data.token); // Armazenar o token no localStorage
      setSnackbarMessage('Login bem-sucedido!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate('/dashboard');
    } catch (error) {
      setSnackbarMessage('Erro no login. Verifique suas credenciais.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </LoginContainer>
  );
};

export default LoginPage;
