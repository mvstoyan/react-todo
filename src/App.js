import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App
