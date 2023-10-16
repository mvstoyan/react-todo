import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import style from "./AddTodoForm.module.css";
import Add from "../../public/img/next.png";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }
    onAddTodo(todoTitle);
    setTodoTitle("");
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        handleTitleChange={handleTitleChange}
      ></InputWithLabel>
      <button className={style.btn} type="submit">
        <img src={Add} alt="Add" className={style.AddButton} />
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
