import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Caminho do contexto

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Se não autenticado, redireciona para o login e armazena a URL de origem
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children; // Se autenticado, renderiza o conteúdo protegido
};

export default PrivateRoute;
