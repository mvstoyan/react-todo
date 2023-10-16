import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo, onUpdateTodo }) {
  return (
    <>
      <ul className={style.ul}>
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
