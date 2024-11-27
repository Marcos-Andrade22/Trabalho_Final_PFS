// pages/TodoListPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Importando o axios configurado
import styled from 'styled-components';
import SnackbarNotification from '../components/SnackbarNotification';

const TodoListContainer = styled.div`
  padding: 2rem;
  background-color: #f4e1c1;
`;

const CategoryContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #d1b18d;
  border-radius: 8px;
`;

const CategoryTitle = styled.h2`
  font-family: 'Garamond', serif;
  color: #4b3f2f;
`;

const TodoItemList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const TodoItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #4b3f2f;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
`;

const CreateItemButton = styled.button`
  padding: 1rem 2rem;
  background-color: #4b3f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  cursor: pointer;
`;

const TodoListPage = () => {
  const [categories, setCategories] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const categoriesData = await api.get('/categories'); // Requisição GET para categorias
        setCategories(categoriesData.data);

        const todoItemsData = await api.get('/items'); // Requisição GET para itens
        setTodoItems(todoItemsData.data);
      } catch (error) {
        setSnackbarMessage('Erro ao carregar dados.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    fetchCategoriesAndItems();
  }, []);

  const handleCreateItem = async () => {
    try {
      const newItem = { title: 'Novo Item', categoryId: categories[0].id }; // Exemplo de criação
      await api.post('/items', newItem); // Requisição POST para criar um novo item
      setSnackbarMessage('Item criado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao criar item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <TodoListContainer>
      <h1>Lista de Tarefas</h1>
      <CreateItemButton onClick={handleCreateItem}>Criar Item</CreateItemButton>
      
      {categories.map((category) => (
        <CategoryContainer key={category.id}>
          <CategoryTitle>{category.name}</CategoryTitle>
          <TodoItemList>
            {todoItems
              .filter((item) => item.categoryId === category.id)
              .map((item) => (
                <TodoItem key={item.id}>{item.title}</TodoItem>
              ))}
          </TodoItemList>
        </CategoryContainer>
      ))}

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </TodoListContainer>
  );
};

export default TodoListPage;
