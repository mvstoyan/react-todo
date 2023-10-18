import React from "react";
import style from "./TodoListItem.module.css";
import Remove from "../../public/img/remove.svg";
import Update from "../../public/img/edit.svg";
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const handleUpdateClick = () => {
    const newTitle = prompt("Change the task name:", todo.title);
    if (newTitle !== null) {
      onUpdateTodo(todo.id, newTitle);
    }
  };
  return (
    <div>
      <li>
        <button
          className={style.icon}
          type="button"
          onClick={handleUpdateClick}
        >
          <img src={Update} alt="Update" className={style.imgBtn} />
        </button>
        <button
          className={style.icon}
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
        >
          <img src={Remove} alt="Remove" className={style.imgBtn} />
        </button>
        <div className={style.title}>{todo.title}</div>
        <div className={style.createdTime}>
          Created at: {new Date(todo.createdTime).toLocaleString()}
        </div>
      </li>
    </div>
  );
}

TodoListItem.propTypes = {
  // shape - expected object structure
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createdTime: PropTypes.string,
  }),
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};

export default TodoListItem;
