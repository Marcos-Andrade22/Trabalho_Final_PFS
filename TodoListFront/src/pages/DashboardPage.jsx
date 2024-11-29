import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f4e1c1;
  text-align: center;
`;

const DashboardTitle = styled.h1`
  font-family: 'Garamond', serif;
  font-size: 2.5rem;
  color: #4b3f2f;
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  background-color: #4b3f2f;
  color: white;
  padding: 1rem 2rem;
  margin-top: 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
`;

const DashboardPage = () => {
  return (
    <DashboardContainer>
      <DashboardTitle>Bem-vindo ao seu Dashboard!</DashboardTitle>
      <ButtonLink to="/todos">Ver Lista de Todos</ButtonLink>
    </DashboardContainer>
  );
};

export default DashboardPage;
