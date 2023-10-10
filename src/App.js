import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const airtableToken = process.env.REACT_APP_AIRTABLE_API_TOKEN;

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${airtableToken}`,
      },
    };
    try {
      const response = await fetch(airtableUrl, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const todosFromAPI = await response.json();
      const todos = todosFromAPI.records.map((todo) => {
        return { id: todo.id, title: todo.fields.title };
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
