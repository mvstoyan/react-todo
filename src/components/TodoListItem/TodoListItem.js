import React from "react";
import style from "./TodoListItem.module.css";
import Remove from "../../public/img/remove.svg";
// import Edit from "./edit.svg";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <div>
      <li>
        {todo.title}
        <button
          className={style.icon}
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
        >
          <img src={Remove} alt="Remove" className={style.imgBtn} />
        </button>
      </li>
    </div>
  );
}

export default TodoListItem;

//<button className={style.icon} type="button" ><img src={Edit} alt="Edit" className={style.imgBtn} /></button>
