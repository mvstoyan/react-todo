import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// saving the todo after page reload
function useSemiPersistentState() {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );
  console.log(localStorage);
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
}

function App() {
  
  const [todoList, setTodoList] = useSemiPersistentState();  //custom hook

  function addTodo(newTodo) {  
    setTodoList([...todoList, newTodo]);  //adds a new todo
  }
  
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
