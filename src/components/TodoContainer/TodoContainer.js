import React from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import style from "./TodoContainer.module.css";
import Animation from "../Animation/animation";
import PropTypes from "prop-types";

function TodoContainer() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const airtableToken = process.env.REACT_APP_AIRTABLE_API_TOKEN;

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const fetchData = async () => {
    const getAirtableUrl = `${airtableUrl}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;
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
      todosFromAPI.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.title.toUpperCase();
        const titleB = objectB.fields.title.toUpperCase();
        if (titleA < titleB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (titleA > titleB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
      const todos = todosFromAPI.records.map((todo) => {
        if (todo.fields.createdTime) {
          return {
            id: todo.id,
            title: todo.fields.title,
            createdTime: new Date(todo.fields.createdTime).toISOString(),
          }; // Back to string
        } else {
          return {
            id: todo.id,
            title: todo.fields.title,
            createdTime: new Date().toISOString(),
          }; // Current fallback time
        }
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
  }, [sortOrder]);

  const addTodo = async (title) => {
    const postTitle = {
      fields: {
        title: title,
        createdTime: new Date().toISOString(), // Add createdTime
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
      const newTodo = {
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.createdTime,
      }; // Add created time
      const updatedTodoList = [...todoList, newTodo]; // Updating list
      updatedTodoList.sort((a, b) => {
        // Sorting by creation time
        if (sortOrder === "asc") {
          return new Date(a.createdTime) - new Date(b.createdTime);
        } else {
          return new Date(b.createdTime) - new Date(a.createdTime);
        }
      });
      setTodoList(updatedTodoList); // Sorted list of tasks
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
          <button onClick={toggleSortOrder} className={style.btn}>
            Toggle Sort Order
          </button>
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
