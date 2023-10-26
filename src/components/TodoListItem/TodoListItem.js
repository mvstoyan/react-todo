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

  const createdTime = new Date(todo.createdTime);
  const isToday = new Date().toDateString() === createdTime.toDateString();

  return (
    <li className={style.todoList}>
      <div className={style.todoItem}>
        <div>
          <p className={style.createdTime + (isToday ? ' ' + style.today : '')}>
            {`${createdTime.getDate()}/${createdTime.getMonth() + 1}/${createdTime.getFullYear()}`}
          </p>
        </div>
        <div>
          <button className={style.icon} type="button" onClick={handleUpdateClick}>
            <img src={Update} alt="Update" className={style.btnUpdate} />
          </button>
          <button className={style.icon} type="button" onClick={() => onRemoveTodo(todo.id)}>
            <img src={Remove} alt="Remove" className={style.btnRemove} />
          </button>
        </div>
      </div>
      <span className={style.title}>{todo.title}</span>
    </li>
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
