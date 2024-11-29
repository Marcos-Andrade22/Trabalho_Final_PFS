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

const CategoryTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryTitle = styled.h2`
  font-family: 'Garamond', serif;
  color: #4b3f2f;
  cursor: pointer;
`;

const CreateItemButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4b3f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 1rem;
  display: ${({ isExpanded }) => (isExpanded ? 'none' : 'inline-block')};
`;

const TodoItemList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
`;

const TodoItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #4b3f2f;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UpdateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f1c40f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #f39c12;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #c0392b;
  }
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
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const categoriesData = await api.get('/categories');
        setCategories(categoriesData.data);

        const todoItemsData = await api.get('/items');
        setTodoItems(todoItemsData.data);
      } catch (error) {
        setSnackbarMessage('Erro ao carregar dados.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    fetchCategoriesAndItems();
  }, []);

  const handleCreateItem = async (categoryId) => {
    try {
      const newItem = {
        title: 'Novo Item',
        categoryId: categoryId,
      };

      // Envia a requisição POST para criar o item
      const { data } = await api.post('/todoitems', newItem);

      setSnackbarMessage('Item criado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Adiciona o item completo (com o id retornado) ao estado
      setTodoItems((prevItems) => [...prevItems, data]);

    } catch (error) {
      setSnackbarMessage('Erro ao criar item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdateItem = async (itemId) => {
    if (!itemId) {
      setSnackbarMessage('ID do item inválido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const newTitle = prompt('Novo título do item:');
    if (!newTitle) return;

    try {
      await api.put(`/TodoItems/${itemId}`, { title: newTitle });
      setSnackbarMessage('Item atualizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTodoItems((prevItems) => prevItems.map((item) =>
        item.id === itemId ? { ...item, title: newTitle } : item
      ));
    } catch (error) {
      setSnackbarMessage('Erro ao atualizar item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!itemId) {
      setSnackbarMessage('ID do item inválido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await api.delete(`/items/${itemId}`);
      setSnackbarMessage('Item excluído com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTodoItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      setSnackbarMessage('Erro ao excluir item.');
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
      const { data } = await api.post('/categories', newCategory);
      setCategories([...categories, data]);
      setNewCategoryName('');
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

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };

  return (
    <TodoListContainer>
      <h1>Lista de Tarefas</h1>

      <CreateCategoryForm onSubmit={handleCreateCategory}>
        <CategoryInput
          type="text"
          placeholder="Nome da nova categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <CreateCategoryButton type="submit">Criar Categoria</CreateCategoryButton>
      </CreateCategoryForm>

      {categories.map((category) => (
        <CategoryContainer key={category.id}>
          <CategoryTitleContainer>
            <CategoryTitle onClick={() => handleCategoryToggle(category.id)}>
              {category.name}
            </CategoryTitle>
            <CreateItemButton
              onClick={() => handleCreateItem(category.id)}
              isExpanded={expandedCategoryId === category.id}
            >
              Criar Item
            </CreateItemButton>
          </CategoryTitleContainer>

          {expandedCategoryId === category.id && (
            <TodoItemList>
              {todoItems
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <TodoItem key={item.id}>
                    {item.title}
                    <div>
                      <UpdateButton onClick={() => handleUpdateItem(item.id)}>Atualizar</UpdateButton>
                      <DeleteButton onClick={() => handleDeleteItem(item.id)}>Excluir</DeleteButton>
                    </div>
                  </TodoItem>
                ))}
            </TodoItemList>
          )}
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