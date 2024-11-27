// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #d1b18d; /* Tom de madeira clara */
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

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/login">Login</Link></NavItem>
        <NavItem><Link to="/dashboard">Dashboard</Link></NavItem>
        <NavItem><Link to="/todos">Lista de Todos</Link></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
