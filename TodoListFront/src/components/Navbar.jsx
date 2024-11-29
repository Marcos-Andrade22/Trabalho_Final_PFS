import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext'; // Certifique-se de que este caminho está correto

const Nav = styled.nav`
  background-color: #d1b18d;
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
`;

const NavItem = styled.li`
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #4b3f2f;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Georgia', serif;
`;

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado de autenticação
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Nav>
      <NavList>
        {!isAuthenticated && (
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        )}
        {isAuthenticated && (
          <>
            <NavItem>
              <Link to="/dashboard">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/todos">Lista de Todos</Link>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </NavItem>
          </>
        )}
      </NavList>
    </Nav>
  );
};

export default Navbar;
