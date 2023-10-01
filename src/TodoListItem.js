import React from "react";

function TodoListItem({ todo }) {
  return (
    <div>
      <li>{todo.title}</li>
    </div>
  );
}

export default TodoListItem;
