// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TodoListPage from './pages/TodoListPage';
import CategoryListPage from './pages/CategoryListPage'; 
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; // Importação corrigida
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <AuthProvider>  {/* Envolvendo a aplicação com o AuthProvider */}
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoListPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
