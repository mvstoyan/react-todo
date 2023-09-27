import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  // Array of tasks
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Read 6 chapters/sections in the Road to React" },
    { id: 3, title: "Watch a video explanation for these chapters of the book" },
    { id: 4, title: "Submit the homework assignment submission form" },
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <ul>
        {/* render the list */}
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
