import React from "react";
import style from "./TodoListItem.module.css";
import Remove from "../../public/img/remove.svg";
import Update from "../../public/img/edit.svg";

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
        {todo.title}
      </li>
    </div>
  );
}

export default TodoListItem;


// import React from "react";
// import style from "./TodoListItem.module.css";
// import Remove from "../../public/img/remove.svg";

// function TodoListItem({ todo, onRemoveTodo }) {
//   return (
//     <div>
//       <li>
//         {todo.title}
//         <button
//           className={style.icon}
//           type="button"
//           onClick={() => onRemoveTodo(todo.id)}
//         >
//           <img src={Remove} alt="Remove" className={style.imgBtn} />
//         </button>
//       </li>
//     </div>
//   );
// }

// export default TodoListItem;


