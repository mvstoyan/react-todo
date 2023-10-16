import React from "react";
import style from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

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

InputWithLabel.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
