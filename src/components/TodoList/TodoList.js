import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul className={style.ul}>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
