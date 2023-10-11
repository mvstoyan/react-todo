import React from "react";
import style from "./InputWithLabel.module.css";

function InputWithLabel({
  id,
  type = "text",
  children,
  value,
  handleTitleChange,
}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        className={style.inputField}
        id={id}
        type={type}
        value={value}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}
export default InputWithLabel;
