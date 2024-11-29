import React, { useState } from 'react';
import { createTodoItem } from '../api/todoItems';

const TodoItemForm = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoItem = { title, categoryId };
    await createTodoItem(todoItem); // Criação do item de tarefa
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo item title"
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Category ID"
      />
      <button type="submit">Create Todo Item</button>
    </form>
  );
};

export default TodoItemForm;
