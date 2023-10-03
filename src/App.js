import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// OLD CODE - saving the todo after page reload
// function useSemiPersistentState() {
//  const [todoList, setTodoList] = React.useState(
//    JSON.parse(localStorage.getItem("savedTodoList")) || []
//  );
//  React.useEffect(() => {
//    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
//  }, [todoList]);
//  return [todoList, setTodoList];
//}
function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")),
            },
          }),
        2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [isLoading, todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]); //adds a new todo
  }
  function removeTodo(id) {
    // removing todo
    const newTodoList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
