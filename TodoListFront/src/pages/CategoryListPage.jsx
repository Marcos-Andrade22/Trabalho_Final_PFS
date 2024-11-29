import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList'; // Importando o componente de lista de categorias

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Supondo que você tenha uma função para buscar as categorias de uma API
    const fetchCategories = async () => {
      // Aqui, substitua pela chamada real à sua API de categorias
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []); // Só busca as categorias quando o componente for montado

  return (
    <div>
      <h1>Categories</h1>
      <CategoryList categories={categories} /> {/* Passando as categorias como props */}
    </div>
  );
};

export default CategoryListPage;
