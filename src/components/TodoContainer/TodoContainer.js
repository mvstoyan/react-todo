import React from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import style from "./TodoContainer.module.css";
import Animation from "../Animation/animation";
import PropTypes from "prop-types";

function TodoContainer() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const airtableToken = process.env.REACT_APP_AIRTABLE_API_TOKEN;

  const fetchData = async () => {
    const getAirtableUrl = `${airtableUrl}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${airtableToken}`,
      },
    };
    try {
      const response = await fetch(getAirtableUrl, options);

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

  const updateTodo = async (id, newTitle) => {
    const updatedTodo = {
      fields: {
        title: newTitle,
      },
    };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`,
      },
      body: JSON.stringify(updatedTodo),
    };
    try {
      const response = await fetch(`${airtableUrl}/${id}`, options);
      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      const updatedTodoData = await response.json();
      const updatedTodo = {
        id: updatedTodoData.id,
        title: updatedTodoData.fields.title,
      };
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return updatedTodo;
        } else {
          return todo;
        }
      });
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={style.note}>
        <Animation />
        <div className={style.container}>
          <h1 className={style.header}>What are your plans for today</h1>
          <AddTodoForm onAddTodo={addTodo} />
          {isLoading ? (
            <p className={style.Loading}>Loading ...</p>
          ) : (
            <TodoList
              todoList={todoList}
              onRemoveTodo={removeTodo}
              onUpdateTodo={updateTodo}
            />
          )}
        </div>
      </div>
    </>
  );
}

TodoContainer.propTypes = {
  todoList: PropTypes.array,
  isLoading: PropTypes.bool, // boolean
  addTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  updateTodo: PropTypes.func,
};

export default TodoContainer;
