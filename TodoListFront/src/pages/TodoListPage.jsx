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

const BaseButton = styled.button`
  padding: 0.8rem 1.5rem;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const CreateItemButton = styled(BaseButton)`
  background-color: #4b3f2f;

  &:hover {
    background-color: #3b3124;
  }
`;

const UpdateButton = styled(BaseButton)`
  background-color: #f1c40f;

  &:hover {
    background-color: #f39c12;
  }
`;

const DeleteButton = styled(BaseButton)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
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

const CreateCategoryButton = styled(BaseButton)`
  background-color: #4b3f2f;

  &:hover {
    background-color: #3b3124;
  }
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
        const [categoriesData, todoItemsData] = await Promise.all([
          api.get('/categories'),
          api.get('/todoitems'),
        ]);
        setCategories(categoriesData.data);
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
      const newItem = { title: 'Novo Item', categoryId };
      const { data } = await api.post('/todoitems', newItem);
      setTodoItems((prevItems) => [...prevItems, data]);

      setSnackbarMessage('Item criado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao criar item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdateItem = async (itemId) => {
    const newTitle = prompt('Novo título do item:');
    if (!newTitle) return;

    const itemToUpdate = todoItems.find((item) => item.id === itemId);

    if (!itemToUpdate) {
      setSnackbarMessage('Item não encontrado.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const updatedItem = { ...itemToUpdate, title: newTitle };
      await api.put(`/todoitems/${itemId}`, updatedItem);

      setTodoItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, title: newTitle } : item
        )
      );

      setSnackbarMessage('Item atualizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao atualizar item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    try {
      await api.delete(`/todoitems/${itemId}`);
      setTodoItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      setSnackbarMessage('Item excluído com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
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
      setCategories((prevCategories) => [...prevCategories, data]);
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

  const handleUpdateCategory = async (categoryId) => {
    // Exibe o prompt para o usuário atualizar o nome da categoria
    const newName = prompt('Novo nome da categoria:');
  
    // Se o nome for vazio ou só contiver espaços, exibe um erro e não faz nada
    if (!newName || newName.trim() === '') {
      setSnackbarMessage('O nome da categoria não pode ser vazio.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    // Envia a requisição PUT para atualizar a categoria
    try {
      const updatedCategory = { id: categoryId, name: newName.trim() }; // Inclui o id da categoria
      await api.put(`/categories/${categoryId}`, updatedCategory); // Requisição para atualizar a categoria
  
      // Atualiza o estado local para refletir a mudança
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId ? { ...category, name: newName.trim() } : category
        )
      );
  
      // Exibe uma notificação de sucesso
      setSnackbarMessage('Categoria atualizada com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
  
      if (error.response?.status === 403) {
        setSnackbarMessage('Você precisa ter permissão de administrador para atualizar este item.');
      } else if (error.response?.status === 400) {
        setSnackbarMessage('Erro ao atualizar a categoria. Verifique os dados enviados.');
      } else {
        setSnackbarMessage('Erro ao atualizar a categoria.');
      }
  
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  


  const handleDeleteCategory = async (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const categoryHasItems = todoItems.some((item) => item.categoryId === categoryId);

    if (categoryHasItems) {
      setSnackbarMessage('Não é possível excluir uma categoria com itens associados.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;

    try {
      await api.delete(`/categories/${categoryId}`);
      setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId));
      setTodoItems((prevItems) => prevItems.filter((item) => item.categoryId !== categoryId));

      setSnackbarMessage('Categoria excluída com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error)
      console.log(error.status)
      if(error.status === 403){
        setSnackbarMessage("Você precisa ter permissão de adminstrador para realizar essa exclusão.")
      }else{
        setSnackbarMessage('Erro ao excluir categoria.');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
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
            <CategoryTitle onClick={() => toggleCategoryExpansion(category.id)}>
              {category.name}
            </CategoryTitle>
            <div>
              <UpdateButton onClick={() => handleUpdateCategory(category.id)}>
                Atualizar Categoria
              </UpdateButton>
              <DeleteButton onClick={() => handleDeleteCategory(category.id)}>
                Excluir Categoria
              </DeleteButton>
              <CreateItemButton
                onClick={() => handleCreateItem(category.id)}
              >
                Criar Item
              </CreateItemButton>
            </div>
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
        handleClose={() => setSnackbarOpen(false)}
      />
    </TodoListContainer>
  );
};

export default TodoListPage;
