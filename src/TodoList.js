import React from 'react';
import TodoListItem from './TodoListItem';

// Array of tasks
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Read 6 chapters/sections in the Road to React" },
    { id: 3, title: "Watch a video explanation for these chapters of the book" },
    { id: 4, title: "Submit the homework assignment submission form" },
  ];

function TodoList() {
  return (
    <ul>
  {todoList.map((todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ))}
</ul>
  );
}

export default TodoList;