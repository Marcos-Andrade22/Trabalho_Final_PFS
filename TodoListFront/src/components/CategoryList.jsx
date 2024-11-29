// src/components/CategoryList.jsx

import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 1rem;
  background-color: #f4e1c1;
  border-radius: 8px;
`;

const ListItem = styled.div`
  margin: 0.5rem 0;
  padding: 0.8rem;
  background-color: #d1b18d;
  border-radius: 4px;
  font-family: 'Georgia', serif;
`;

const CategoryList = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p>Nenhuma categoria disponível.</p>;
  }

  return (
    <ListContainer>
      {categories.map((category, index) => (
        <ListItem key={index}>{category}</ListItem>
      ))}
    </ListContainer>
  );
};

export default CategoryList;
