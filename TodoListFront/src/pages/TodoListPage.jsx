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

const CreateCategoryForm = styled.form`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  background-color: #d1b18d;
  padding: 1rem;
  border-radius: 8px;
`;

const CategoryInput = styled.input`
  padding: 0.8rem;
  font-size: 1.2rem;
  border-radius: 4px;
  border: 1px solid #4b3f2f;
  width: 70%;
`;

const CreateCategoryButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4b3f2f;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TodoListPage = () => {
  const [categories, setCategories] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
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

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) {
      setSnackbarMessage('O nome da categoria não pode estar vazio.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const newCategory = { name: newCategoryName };
      const { data } = await api.post('/categories', newCategory); // Requisição POST para criar categoria
      setCategories([...categories, data]); // Atualiza a lista de categorias com a nova categoria
      setNewCategoryName(''); // Limpa o campo de input
      setSnackbarMessage('Categoria criada com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao criar categoria.');
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

      {/* Formulário para criação de categoria */}
      <CreateCategoryForm onSubmit={handleCreateCategory}>
        <CategoryInput
          type="text"
          placeholder="Nome da nova categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <CreateCategoryButton type="submit">Criar Categoria</CreateCategoryButton>
      </CreateCategoryForm>

      {/* Exibindo categorias e itens */}
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

      <CreateItemButton onClick={handleCreateItem}>Criar Item</CreateItemButton>

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
