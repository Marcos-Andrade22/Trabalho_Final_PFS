import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTodoItems, createTodoItem } from '../api/todoItems'; // Supondo que você tenha essa função

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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c19a6d; /* Cor de hover para indicar que é clicável */
  }
`;

const TodoListContainer = styled.div`
  padding-left: 1rem;
  background-color: #f0e4d7;
  border-radius: 4px;
  margin-top: 1rem;
`;

const TodoItem = styled.div`
  padding: 0.5rem;
  background-color: #f4e1c1;
  border-radius: 4px;
  margin: 0.3rem 0;
`;

const CreateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const CategoryList = ({ categories }) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null); // Controla qual categoria está expandida
  const [todoItems, setTodoItems] = useState([]);

  // Quando uma categoria é selecionada, a lista de itens de tarefa é carregada
  useEffect(() => {
    if (expandedCategoryId !== null) {
      const fetchTodoItemsByCategory = async () => {
        const data = await getTodoItems(); // Supondo que `getTodoItems` retorna todos os itens
        setTodoItems(data.filter(item => item.categoryId === expandedCategoryId));
      };

      fetchTodoItemsByCategory();
    } else {
      setTodoItems([]);
    }
  }, [expandedCategoryId]);

  // Alterna entre expandir ou contrair a categoria
  const handleCategoryClick = (categoryId) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };

  // Função para criar um novo item de tarefa dentro de uma categoria
  const handleCreateTodoItem = async (categoryId) => {
    const newTodoItem = await createTodoItem(categoryId, { title: "Novo item" });

    // Atualiza a lista de tarefas para a categoria
    setTodoItems((prevItems) => [...prevItems, newTodoItem]);
  };

  return (
    <ListContainer>
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id}>
            <ListItem onClick={() => handleCategoryClick(category.id)}>
              {category.name}
              <CreateButton onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no botão abra ou feche o accordion
                handleCreateTodoItem(category.id);
              }}>
                Criar item
              </CreateButton>
            </ListItem>

            {/* Accordion: Mostrar lista de tarefas apenas se a categoria estiver expandida */}
            {expandedCategoryId === category.id && (
              <TodoListContainer>
                {todoItems.length === 0 ? (
                  <p>Nenhum item para esta categoria.</p>
                ) : (
                  todoItems.map((item) => (
                    <TodoItem key={item.id}>{item.title}</TodoItem>
                  ))
                )}
              </TodoListContainer>
            )}
          </div>
        ))
      ) : (
        <p>Nenhuma categoria disponível.</p>
      )}
    </ListContainer>
  );
};

export default CategoryList;
