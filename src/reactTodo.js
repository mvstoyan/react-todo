import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function ReactTodo() {
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

  const addTodo = async (title) => {
    const postTitle = {
      fields: {
        title: title,
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`,
      },
      body: JSON.stringify(postTitle),
    };
    try {
      const response = await fetch(airtableUrl, options);
      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      const todo = await response.json();
      const newTodo = { id: todo.id, title: todo.fields.title };
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`,
      },
    };
    try {
      const response = await fetch(`${airtableUrl}/${id}`, options);
      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      const newTodoList = todoList.filter(function (todo) {
        return id !== todo.id;
      });
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message);
    }
  };

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

export default ReactTodo;
