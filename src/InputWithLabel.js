import React from "react";

function InputWithLabel({
  id,
  type = "text",
  children,
  value,
  onInputChange,
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
        onChange={onInputChange}
        ref={inputRef}
      />
    </>
  );
}
export default InputWithLabel;
