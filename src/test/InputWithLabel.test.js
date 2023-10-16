// InputWithLabel creating an input field with a textual label in the app.
// In the test, checking that the component displays the label
// and input field, and the handleTitleChange function is called when
// the input field content changes.
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputWithLabel from "../components/InputWithLabel/InputWithLabel";
import "@testing-library/jest-dom";

test("renders input field with label", () => {
  // Create mock func. to handle the title change
  const handleTitleChange = jest.fn();
  render(
    // Render the InputWithLabel with mock func.
    <InputWithLabel
      id="test-id"
      type="text"
      handleTitleChange={handleTitleChange}
    >
      Test Label
    </InputWithLabel>
  );

  const inputElement = screen.getByLabelText("Test Label");
  // Check if the input element is present on the screen
  expect(inputElement).toBeInTheDocument();
});

test("calls handleTitleChange on input change", () => {
  const handleTitleChange = jest.fn();
  render(
    <InputWithLabel
      id="test-id"
      type="text"
      handleTitleChange={handleTitleChange}
    >
      Test Label
    </InputWithLabel>
  );

  const inputElement = screen.getByLabelText("Test Label");
  // Simulate a change event on the input element with a test value
  fireEvent.change(inputElement, { target: { value: "Test Value" } });
  // Check if the handleTitleChange was called 1 with any object
  expect(handleTitleChange).toHaveBeenCalledTimes(1);
  expect(handleTitleChange).toHaveBeenCalledWith(expect.any(Object));
});
