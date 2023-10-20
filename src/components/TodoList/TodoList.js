import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({
  todoList,
  onRemoveTodo,
  onUpdateTodo,
  toggleSortOrder,
  sortOrder,
}) {
  const sortButtonText = sortOrder === "asc" ? "Z-A" : "A-Z";
  return (
    <>
      <ul className={style.ul}>
        <button onClick={toggleSortOrder} className={style.btn}>
          {sortButtonText}
        </button>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};

export default TodoList;
