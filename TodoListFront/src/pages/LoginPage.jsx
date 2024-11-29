import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios';
import SnackbarNotification from '../components/SnackbarNotification';
import { AuthContext } from '../context/AuthContext'; // Importando o contexto

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

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4e1c1;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);

      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage('Credenciais inválidas!');
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <SnackbarNotification message={errorMessage} />}
        <Button type="submit">Login</Button>
      </Form>
    </PageContainer>
  );
};

export default LoginPage;
