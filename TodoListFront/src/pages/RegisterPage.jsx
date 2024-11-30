import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios';
import SnackbarNotification from '../components/SnackbarNotification';

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

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #4b3f2f;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  background-color: #fff;
  appearance: none; /* Remove o estilo padrão do navegador */
  -webkit-appearance: none; /* Para o Safari */
  -moz-appearance: none; /* Para o Firefox */
  cursor: pointer;
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

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User'); // Estado para a role
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Controle do snackbar
  const [severity, setSeverity] = useState('success'); // Tipo de severidade do snackbar
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const payload = { username, password, role }; // Incluindo role no payload
      const response = await api.post('/auth/register', payload);
      setSuccessMessage(response.data || 'Usuário registrado com sucesso!');
      setSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/login'), 2000); // Redireciona para o login após 2 segundos
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      setErrorMessage(error.response?.data || 'Failed to register.');
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* Campo para selecionar o Role */}
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </Select>

        <Button type="submit">Register</Button>
      </Form>

      {/* Snackbar Notification */}
      <SnackbarNotification
        open={openSnackbar}
        message={errorMessage || successMessage}
        severity={severity}
        handleClose={handleCloseSnackbar}
      />
    </PageContainer>
  );
};

export default RegisterPage;
