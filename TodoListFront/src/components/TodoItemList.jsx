import React, { useEffect, useState } from 'react';
import { getTodoItems } from '../api/todoItems';

const TodoItemList = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      const data = await getTodoItems(); // Obtendo os itens da lista de tarefas
      setTodoItems(data);
    };
    fetchTodoItems();
  }, []);

  return (
    <div>
      <h3>Todo Items</h3>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>{item.title} - {item.categoryId}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItemList;
