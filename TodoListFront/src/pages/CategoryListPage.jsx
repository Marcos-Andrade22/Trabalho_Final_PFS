// pages/CategoryListPage.jsx
import React from 'react';
import CategoryList from '../components/CategoryList'; // Importando o componente de lista de categorias

const CategoryListPage = () => {
  return (
    <div>
      <h1>Categories</h1>
      <CategoryList /> {/* Exibindo a lista de categorias */}
    </div>
  );
};

export default CategoryListPage;
