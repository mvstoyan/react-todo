import React from "react";

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
